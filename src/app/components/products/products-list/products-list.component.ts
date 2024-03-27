import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {ActionEvent, AppDataState, ProductActionsTypes} from '../../../state/product.state';
import {Product} from '../../../model/product.model';
import {DataStateEnum} from '../../../state/product.state';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input() productsInput$:Observable<AppDataState<Product[]>> |null=null;
  @Output() productsEventEmitter:EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>()
  //vous créez une propriété DataStateEnum qui est une copie de l'énumération DataStateEnum, mais en lecture seule.
  // Cela signifie que vous pouvez accéder à cette énumération depuis l'extérieur de la classe où elle est déclarée, mais vous ne pouvez pas la modifier.
  //comme ça je peux l'utiler dans le html L36 L39et L44
  readonly DataStateEnum=DataStateEnum;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(p: Product) {
    this.productsEventEmitter.emit({type:ProductActionsTypes.SELECT_PRODUCT,payload:p})
  }

  onDelete(p: Product) {
    this.productsEventEmitter.emit({type:ProductActionsTypes.DELETE_PRODUCT,payload:p})
  }

  onEdit(p: Product) {
    this.productsEventEmitter.emit({type:ProductActionsTypes.EDIT_PRODUCT,payload:p})
  }

  onActionEvent($event: ActionEvent) {
    //j'aurai pu faire comme dans products.ts mais ça ne sert a rient car les evenements sont deja traiter dans products.ts
    this.productsEventEmitter.emit($event);
  }
}
