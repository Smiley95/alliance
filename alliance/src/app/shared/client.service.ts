import { Injectable } from '@angular/core';
import { Client } from 'src/app/shared/client.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

formData : Client;
list : Client[];
readonly rootURL ="http://localhost:51312/api"
  constructor(private http : HttpClient) {}
  
  postClient(formData : Client){
    return this.http.post(this.rootURL+'/Clients',formData);
     
   }
 
   refreshList(){
     this.http.get(this.rootURL+'/Clients')
     .toPromise().then(res => this.list = res as Client[]);
   }
 
   putClient(formData : Client){
     return this.http.put(this.rootURL+'/Clients/'+formData.ClientID,formData);
      
    }
 
    deleteClient(id : number){
     return this.http.delete(this.rootURL+'/Clients/'+id);
    }
}
