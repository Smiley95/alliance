import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable } from 'rxjs';
import { IProduct } from '../interface/IProduct';
import {HttpService } from '../shared/http.service';
import {IProvider} from '../interface/IProvider';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit {

   public loading = false;
  
    public providers = [];
  
  public provider = {
    providerID: 0,
    name: "",
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
   this.get_providers();
  }

  /**
   * get_providers 
   */
  public get_providers(): Observable<IProvider[]> {
    this.loading = true;
    this.http.get<IProvider[]>(this._httpService.providers_url).
        subscribe(
              rep => {this.loading = false;this.providers = rep;console.log(rep)},
              error => {console.log(error)});
    return;
  }


  /**
   * add provider
   */
  public add_provider() {
    console.log(this.provider);
    this.loading = true
    this.http.post(this._httpService.providers_url, this.provider).
        subscribe(rep => {this.loading = false;console.log(rep);this.notifier.notify( "success", "Fournisseur Ajouté" );this.get_providers();},
                error => {this.notifier.notify( "error", "Impossible d'ajouter ce fournisseur!" );console.log(error)})
    return;
  }


   /**
   * get_product
   */
  public get_one_provider(provider) {

    this.provider = provider;
  }


   /**
   * update provider 
   */
  public update_provider() {
    this.loading = true;
    console.log(this.provider);
    var update_url = this._httpService.providers_url+"/"+this.provider.providerID;

    this.http.put(update_url, this.provider).
        subscribe(rep => {this.loading=false;console.log(rep);this.notifier.notify( "success", "Fournisseur modifié" );this.get_providers();},
                error => {this.notifier.notify( "error", "Impossible de modifier ce fournisseur!" );console.log(error)})
    return;
  }

  /**
   * delete provider
   */
  public delete_provider(provider) {
    console.log(provider);
    this.loading = true;
    var delete_url = this._httpService.providers_url+"/"+provider.providerID;
    this.http.delete(delete_url).
        subscribe(rep => { this.loading = false;console.log(rep);this.notifier.notify( "success", "Fournisseur a été supprimé avec succés !" );this.get_providers();},
                error => {this.notifier.notify( "error", "Impossible de supprimer ce fournisseur!" );console.log(error)});
    return;
  }

  /**
   * empty obj
   */
  public empty_obj() {
    this.provider.providerID = 0;
    this.provider.email ="";
    this.provider.name ="";
    this.provider.phone ="";
    this.provider.address ="";

    
  }

}
