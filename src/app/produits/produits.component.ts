import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produits';
import { NgForm } from '@angular/forms';

import { ProduitsService } from '../services/produits.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  constructor(private produitsService :ProduitsService) {}
  afficherFormulaire = false;
  produitCourant = new Produit();
  produits: Array<Produit> = [];
  idAct: any ;

  ngOnInit(): void {
    console.log("Initialisation du composant: Récupérer la liste des produits");
    this.consulterProduits();
  }

  editProduct(product: any) {
    this.produitCourant = { ...product };
  }

  validerFormulaire(form: NgForm) {

    console.log(form.value);

  //  if (form.value.id != undefined) { // id existe dans la zone du texte 
      console.log("id non vide...");
 const p=new Produit();
 p.id=this.idAct;
 p.code=form.value.code;
 p.designation=form.value.designation;
 p.prix=form.value.prix;
      this.mettreAJour(p);
      this.afficherFormulaire=false;
     // this.afficherFormulaire=false;
   // } else {
    //  console.log("id vide...");
     // this.ajouterProduit(form.value);
 //   }
 
  }

  mettreAJour(nouveau: Produit) {

    const ancien = this.produits.find(p => p.id === nouveau.id);
    if (ancien) {
      console.log('ancien');
      const reponse: boolean = confirm(" Confirmez-vous la mise à jour ?" );

      if (reponse) {
       // this.http.put<Array<Produit>>(`http://localhost:3333/produits/${nouveau.id}`, nouveau)
       this.produitsService.updateProduit( nouveau)

          .subscribe({
            next: updatedProduit => {
              console.log("Succès PUT");
              ancien.id=nouveau.id;
              ancien.code = nouveau.code;
              ancien.designation = nouveau.designation;
              ancien.prix = nouveau.prix;
              console.log('Mise à jour du produit:' + ancien.designation);
              alert("Produit mis à jour avec succès")
            },
            error: err => {
              console.log("Erreur PUT");
            }
          });
      } else {
        console.log("Mise à jour annulée");
       // 
      }
    }else{
    console.log("essai d'ajout");
  }
  }
  trier(ordre: string): void {
    if (ordre === 'croissant') {
      this.produits.sort((a, b) => {
        if (a.prix !== undefined && b.prix !== undefined) {
          return (a.prix > b.prix) ? 1 : -1;
        }
        return 0; // Si l'un des prix est undefined, on laisse l'ordre tel quel
      });
    } else if (ordre === 'decroissant') {
      this.produits.sort((a, b) => {
        if (a.prix !== undefined && b.prix !== undefined) {
          return (a.prix < b.prix) ? 1 : -1;
        }
        return 0; // Si l'un des prix est undefined, on laisse l'ordre tel quel
      });
    }
  }
  



  supprimerProduit(produit: Produit) {
    const reponse: boolean = confirm("Voulez-vous supprimer le produit :" + produit.designation + " ?");
    if (reponse) {
      this.produitsService.deleteProduit(produit)

     // this.http.delete(`http://localhost:3333/produits/${produit.id}`)
        .subscribe({
          next: () => {
            console.log("Succès DELETE");
            this.produits = this.produits.filter(p => p.id !== produit.id);
            console.log("Suppression du produit avec l'ID: " + produit.id);
          },
          error: err => {
            console.log("Erreur DELETE");
          }
        });
    }
  }

  consulterProduits() {
    console.log("Récupérer la liste des produits");
    //Appeler la méthode 'getProduits' du service pour récupérer les données du JSON
    this.produitsService.getProduits()
      .subscribe({
        next: data => {
          console.log("Succès GET");
          this.produits = data;
        },
        error: err => {
          console.log("Erreur GET");
        }
      });
  }

  effacer() {
    this.produitCourant = new Produit();
  }

  editer(produit: Produit) {
    this.afficherFormulaire = true;
    this.produitCourant.id = this.idAct=produit.id;
    this.produitCourant.code = produit.code;
    this.produitCourant.designation = produit.designation;
    this.produitCourant.prix = produit.prix;
  }
}