import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../model/product.model';
import {Observable, of} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';
import {AppDataState, DataStateEnum} from '../../state/product.state';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
   products$:Observable<AppDataState<Product[]>> |null=null;
   //vous créez une propriété DataStateEnum qui est une copie de l'énumération DataStateEnum, mais en lecture seule.
   // Cela signifie que vous pouvez accéder à cette énumération depuis l'extérieur de la classe où elle est déclarée, mais vous ne pouvez pas la modifier.
   //comme ça je peux l'utiler dans le html L36 L39et L44
   readonly DataStateEnum=DataStateEnum;

   constructor(private productsService:ProductsService, private router:Router) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    this.products$= this.productsService.getAllProducts().pipe(
        map(data=>{
          console.log(data);
          return ({dataState:DataStateEnum.LOADED,data:data})
        }),
        //L'opérateur startWith est utilisé pour émettre une valeur initiale immédiatement après la souscription à l'Observable. Cela signifie que cette valeur est émise dès que l'Observable est activé.
        startWith({dataState:DataStateEnum.LOADING}),
        //L'opérateur catchError est utilisé pour intercepter les erreurs qui se produisent pendant la récupération des données.
        // Si une erreur se produit, cette fonction de capture d'erreur est déclenchée. La variable err contient l'erreur qui s'est produite.
        //L'opérateur of est utilisé pour émettre une nouvelle valeur Observable, qui est un objet avec l'état d'erreur et le message d'erreur.
        catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
      );
  }

  onGetSelectedProducts() {
    this.products$= this.productsService.getSelectedProducts().pipe(
      map(data=>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onGetAvailableProducts() {
    this.products$= this.productsService.getAvailableProducts().pipe(
      map(data=>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  //dataForm est un objet contenant les valeurs des champs du formulaire. Dans ce cas, dataForm.keyword récupère la valeur du champ de saisie du mot-clé de recherche.
  onSearch(dataForm: any) {
    this.products$= this.productsService.searchProducts(dataForm.keyword).pipe(
      map(data=>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onSelect(p: Product) {
    this.productsService.select(p)
      .subscribe(data=>{
        p.selected=data.selected; // une fois que je recupère data je ne change que l'attribut p et ça ne recharge pas toute la page
      })
  }

  onDelete(p: Product) {
     let v=confirm("Etes vous sûre?");
     if(v==true)
    this.productsService.deleteProduct(p)
      .subscribe(data=>{
        this.onGetAllProducts();
      })
  }

  onNewProduct() {
    this.router.navigateByUrl("/newProduct");
  }

  onEdit(p: Product) {
    this.router.navigateByUrl("/editProduct/"+p.id);
  }
}
