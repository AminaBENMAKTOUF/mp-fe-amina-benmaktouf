import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produit } from '../model/produits';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  urlHote="http://localhost:3333/produits/";

  constructor(private http :HttpClient)
  {
  }
   getProduits() :Observable<Array<Produit>>
  {
  return this.http.get<Array<Produit>> (this.urlHote);
  }
  //
  deleteProduit(produit: Produit)
  {
  //return this.http.delete (this.urlHote+idP);
  return this.http.request('delete', this.urlHote, { body: produit });
  }
  ///
  addProduit(nouveau: Produit)
   {
  return this.http.post<Produit> (this.urlHote,nouveau);
  }
  updateProduit( nouveau: Produit)
   {

  //return this.http.put(this.urlHote+idP,nouveau);
  return this.http.request('put', this.urlHote, { body: nouveau });
  }

}
