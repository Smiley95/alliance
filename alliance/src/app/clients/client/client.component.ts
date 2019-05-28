import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/shared/client.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private service: ClientService) { }

  ngOnInit() {
    this.resetForm();
  }
  
  resetForm(form? : NgForm){
    if(form!=null)
    form.resetForm();
    this.service.formData = {
      ClientID: null,
      Name: '',
      FamilyName: '',
      Phone: '',
      Email: '',
      CarteFidelite: ''
    }
  }
  
  onSubmit(form: NgForm) {
    if (form.value.ClientID == null)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postClient(form.value).subscribe(res => {
      //this.toastr.success('Inserted successfully', 'Client. Register');
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  updateRecord(form: NgForm) {
    this.service.putClient(form.value).subscribe(res => {
      //this.toastr.info('Updated successfully', 'Client. Register');
      this.resetForm(form);
      this.service.refreshList();
    });

  }

}
