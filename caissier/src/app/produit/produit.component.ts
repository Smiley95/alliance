import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable } from 'rxjs';
import { IProduct } from '../interface/IProduct';
import {HttpService } from '../shared/http.service';
import {IProvider} from '../interface/IProvider';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  public loading = false;
  public products = [];
  public providers = [];
  

public product = {
  productID:0,
  name: "",
  providerID: 0,
  stockQuantity: 0,
  category: ""
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
    this.get_providers();
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
   * get_product
   */
  public get_one_product(produit) {

    this.product = produit;

  }

  /**
   * empty obj
   */
  public empty_obj() {
    this.product = {
      productID: 0,
      name: "",
      providerID: 0,
      stockQuantity: 0,
      category: ""
    };
  }

  /**
   * add product
   */
  public add_product() {
    console.log(this.product);
    this.http.post(this._httpService.produits_url, this.product).
        subscribe(rep => {console.log(rep);this.notifier.notify( "success", "Ajoute" );this.get_products();},
                error => {console.log(error)})
    return;
  }


  /**
   * update product
   */
  public update_product() {
    console.log(this.product);
    var update_url = this._httpService.produits_url+"/"+this.product.productID;
    this.http.get(update_url).subscribe(rep => this.product.providerID=rep["providerID"]);
    console.log(update_url)
    this.http.put(update_url, this.product).
        subscribe(rep => {console.log(rep);this.notifier.notify( "success", "edit" );this.get_products();},
                error => {console.log(error)})
    return;
  }

  /**
   * delete product
   */
  public delete_product(product) {
    var delete_url = this._httpService.produits_url+"/"+product.productID;
    this.http.delete(delete_url).
        subscribe(rep => {console.log(rep);this.notifier.notify( "success", "delete" );this.get_products();},
                error => {console.log(error)})
    return;
  }

  /**
   * get_providers
   */
  public get_providers(): Observable<IProvider[]> {
    this.http.get<IProvider[]>(this._httpService.providers_url).
        subscribe(
              rep => {this.providers = rep;console.log(rep)},
              error => {console.log(error)});
    return;
  }


  onchange(value) {
    this.product.providerID=value;
    console.log(value);
  }
}
