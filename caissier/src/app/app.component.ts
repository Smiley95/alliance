import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router:Router){}
  title = 'caissier';


  /**
   * goToHomePage
   */
  public goToHomePage() {
    this.router.navigate(['/accueil']);
  }

  /**
   * goToClientMangerPage
   */
  public goToClientMangerPage() {
    this.router.navigate(['clientManager']);
  }


  public goToProviderMangerPage() {
    this.router.navigate(['fournisseurManager']);
  }

  public goToProductMangerPage() {
    this.router.navigate(['produitManager']);
  }
  public goToVenteMangerPage() {
    this.router.navigate(['VenteManager']);
  }
}
