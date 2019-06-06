import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable } from 'rxjs';
import { IClient } from '../interface/IClient';
import {HttpService } from '../shared/http.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  public loading = false;
  
    public clients = [];
  
  public client = {
    clientID: 0,
    name: "",
    familyName: "",
    email: "",
    phone: "",
    address: ""
  }
  
    private notifier: NotifierService;
  
    /**
     * Constructor
     *
     * @param {NotifierService} notifier Notifier service
     */
  constructor(private http: HttpClient, private _httpService: HttpService, notifier: NotifierService) {
    this.notifier = notifier;
  }

  ngOnInit() {
   this.get_clients();
  }

  /**
   * get_clients 
   */
  public get_clients(): Observable<IClient[]> {
    this.loading = true;
    this.http.get<IClient[]>(this._httpService.clients_url).
        subscribe(
              rep => {this.loading = false;this.clients = rep;console.log(rep)},
              error => {console.log(error)});
    return;
  }


  /**
   * add client
   */
  public add_client() {
    console.log(this.client);
    this.loading = true
    this.http.post(this._httpService.clients_url, this.client).
        subscribe(rep => {this.loading = false;console.log(rep);this.notifier.notify( "success", "Client Ajouté" );this.get_clients();},
                error => {this.notifier.notify( "error", "Impossible d'ajouter ce client!" );console.log(error)})
    return;
  }


   /**
   * get_product
   */
  public get_one_client(client) {

    this.client = client;
  }


   /**
   * update client 
   */
  public update_client() {
    this.loading = true;
    console.log(this.client);
    var update_url = this._httpService.clients_url+"/"+this.client.clientID;

    this.http.put(update_url, this.client).
        subscribe(rep => {this.loading=false;console.log(rep);this.notifier.notify( "success", "Client modifié" );this.get_clients();},
                error => {this.notifier.notify( "error", "Impossible de modifier ce client!" );console.log(error)})
    return;
  }

  /**
   * delete client
   */
  public delete_client(client) {
    console.log(client);
    this.loading = true;
    var delete_url = this._httpService.clients_url+"/"+client.clientID;
    this.http.delete(delete_url).
        subscribe(rep => { this.loading = false;console.log(rep);this.notifier.notify( "success", "Client a été supprimé avec succés !" );this.get_clients();},
                error => {this.notifier.notify( "error", "Impossible de supprimer ce client!" );console.log(error)});
    return;
  }

  /**
   * empty obj
   */
  public empty_obj() {
    this.client.clientID = 0;
    this.client.email ="";
    this.client.name ="";
    this.client.familyName ="";
    this.client.phone ="";
    this.client.address ="";

    
  }

}
