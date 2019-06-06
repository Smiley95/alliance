import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable } from 'rxjs';
import { IProduct } from '../interface/IProduct';
import {HttpService } from '../shared/http.service';
import {IClient} from '../interface/IClient';
import {IVente} from '../interface/IVente';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.css']
})
export class VenteComponent implements OnInit {

  public loading = false;
  public products = [];
  public clients = [];
  public ventes = [];
  

public vente = {
  venteID:0,
  clientID: 0,
  productID: 0,
  quantity: 0,
  total: 0,
  dateVente: null
};

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
    this.get_products();
    this.get_clients();
    this.get_ventes();
  }

  /**
   * get_products
   */
  public get_products(): Observable<IProduct[]> {
    this.loading=true;
    this.http.get<IProduct[]>(this._httpService.produits_url).
        subscribe(rep => {this.loading=false;
          this.products = rep; 
          this.products.forEach((product => {
            console.log(product)
             
          }))
          console.log(rep)},
                error => {console.log(error)})
    return;
  }

   /**
   * get_vente
   */
  public get_one_vente(vente) {

    this.vente = vente;

  }

  /**
   * empty obj
   */
  public empty_obj() {
    this.vente = {
      venteID:0,
      clientID: 0,
      productID: 0,
      quantity: 0,
      total: 0,
      dateVente: null
    };
  }

  /**
   * add vente
   */
  public add_vente() {
    console.log(this.vente);
    this.http.post(this._httpService.ventes_url, this.vente).
        subscribe(rep => {console.log(rep);this.notifier.notify( "success", "Ajoute" );this.get_ventes();},
                error => {console.log(error)})
    return;
  }


  /**
   * update vente
   */
  public update_vente() {
    console.log(this.vente);
    var update_url = this._httpService.ventes_url+"/"+this.vente.venteID;
    //this.http.get(update_url).subscribe(rep => {this.vente.productID=rep["productID"];this.vente.clientID=rep["clientID"]});
    console.log(update_url)
    this.http.put(update_url, this.vente).
        subscribe(rep => {console.log(rep);this.notifier.notify( "success", "edit" );this.get_ventes();},
                error => {console.log(error)})
    return;
  }

  /**
   * delete vente
   */
  public delete_vente(vente) {
    var delete_url = this._httpService.ventes_url+"/"+vente.venteID;
    this.http.delete(delete_url).
        subscribe(rep => {console.log(rep);this.notifier.notify( "success", "delete" );this.get_ventes();},
                error => {console.log(error)})
    return;
  }

  /**
   * get_clients
   */
  public get_clients(): Observable<IClient[]> {
    this.http.get<IClient[]>(this._httpService.clients_url).
        subscribe(
              rep => {this.clients = rep;console.log(rep)},
              error => {console.log(error)});
    return;
  }
  /**
   * get_ventes
   */
  
  public get_ventes(): Observable<IVente[]> {
    this.http.get<IVente[]>(this._httpService.ventes_url).
        subscribe(
              rep => {this.ventes = rep;console.log(rep)},
              error => {console.log(error)});
    return;
  }

  onchange(value) {
    this.vente.venteID=value;
    console.log(value);
  }
}
