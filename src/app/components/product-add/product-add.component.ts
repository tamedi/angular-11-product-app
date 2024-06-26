import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productFormGroup?:FormGroup;
  submitted:boolean=false;

  constructor(private fb:FormBuilder, private productsService:ProductsService) { }

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
    this.submitted=true; // une fois je click sur le bouton ça passe a true
    if(this.productFormGroup?.invalid) return; // le return veut dire je ne fais pas ce qui est en dessous cad j'appelle pas le service
    this.productsService.save(this.productFormGroup?.value)
      .subscribe(data=>{
        alert("Success Saving product");
      });
  }
}
