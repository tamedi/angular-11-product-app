import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductsService} from '../../services/products.service';
import {EventDriverService} from '../../state/event.driver.service';
import {ProductActionsTypes} from '../../state/product.state';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productFormGroup?:FormGroup;
  submitted:boolean=false;

  constructor(private fb:FormBuilder, private productsService:ProductsService,private eventDrivenService:EventDriverService) { }

  ngOnInit(): void {
    this.productFormGroup=this.fb.group({
      name:["",Validators.required],
      price:[0,Validators.required],
      quantity:[0,Validators.required],
      selected:[true,Validators.required],
      available:[true,Validators.required],
    });
  }

  onSaveProduct() {
    this.submitted=true;
    if(this.productFormGroup?.invalid) return; // le return veut dire je ne fais pas ce qui est en dessous cad j'appelle pas le service
    this.productsService.save(this.productFormGroup?.value)
      .subscribe(data=>{
        // comme dans le service state j'ai rajouter PRODUCT_ADDED je fais un publish de l'venement pour qu'il face incrémenter les stats et je fais pareil pour le edit
        this.eventDrivenService.publishEvent({type:ProductActionsTypes.PRODUCT_ADDED})
        alert("Success Saving product");
      });
  }
}
