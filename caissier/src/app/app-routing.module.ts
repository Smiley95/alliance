import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ClientComponent } from './client/client.component';
import { ProduitComponent } from './produit/produit.component';
import { VenteComponent } from './vente/vente.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
const routes: Routes = [
  {path: '', redirectTo: '/accueil', pathMatch: 'full'},
  {path: 'accueil', component : AccueilComponent},
  {path: 'clientManager', component : ClientComponent},
  {path: 'produitManager', component : ProduitComponent},
  {path: 'fournisseurManager', component : FournisseurComponent},
  {path: 'VenteManager', component : VenteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
