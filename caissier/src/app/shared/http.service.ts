import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public url = "http://192.168.43.70:51751/";

  public produits_url = this.url+"api/Products";

  public providers_url = this.url+"api/Providers";
  
  public clients_url = this.url+"api/Clients";

  public ventes_url = this.url+"api/Ventes";
  
  constructor() { }
}