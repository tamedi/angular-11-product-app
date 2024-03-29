import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {any} from 'codelyzer/util/function';
import {ActionEvent, ProductActionsTypes} from '../../../state/product.state';
import {EventDriverService} from '../../../state/event.driver.service';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {

  //ce composant child a une sorti et va emettre un evenement de sorti
  //@Output() productEventEmitter : EventEmitter<ActionEvent> = new EventEmitter()

  constructor(private eventDrivenService:EventDriverService) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    //jenvoie un evenement vers le parent qu'on appelle ALL_PRODUCTSdans
    //this.productEventEmitter.emit({type:ProductActionsTypes.GET_ALL_PRODUCTS})
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.GET_ALL_PRODUCTS});
  }

  onGetSelectedProducts() {
    //this.productEventEmitter.emit({type:ProductActionsTypes.GET_SELECTED_PRODUCTS});
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.GET_SELECTED_PRODUCTS});
  }

  onGetAvailableProducts() {
    //this.productEventEmitter.emit({type:ProductActionsTypes.GET_AVAILABLE_PRODUCTS});
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.GET_AVAILABLE_PRODUCTS});
  }

  onNewProduct() {

    //this.productEventEmitter.emit({type:ProductActionsTypes.NEW_PRODUCT});
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.NEW_PRODUCT});
  }

  onSearch(dataForm: any) {
    /*
     this.productEventEmitter.emit(
       {type:ProductActionsTypes.SEARCH_PRODUCTS, payload:dataForm}
       );
      */
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.SEARCH_PRODUCTS, payload:dataForm});
  }
}
