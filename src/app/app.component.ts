import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  actions:Array<any>=
 [
{titre: "Accueil", route:"/accueil", icone:"bi bi-house-fill" },
{titre: "Liste des produits", route:"/produits", icone:"bi bi-card-list" },
{titre: "Ajouter Produit", route:"/ajouterProduit", icone:"bi bi-file-earmark-plus-fill" }
 ]




actionCourante:any;
setActionCourante(a:any){
  this.actionCourante=a;
}

}
