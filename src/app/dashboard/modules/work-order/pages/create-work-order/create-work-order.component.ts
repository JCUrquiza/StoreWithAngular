import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../warehouses/services/products.service';
import { Product } from '../../../warehouses/interfaces';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-work-order',
  templateUrl: './create-work-order.component.html',
  styleUrl: './create-work-order.component.css'
})
export class CreateWorkOrderComponent implements OnInit {

  public products: Product[] = [];

  public httpProduct = inject(ProductsService);

  ngOnInit(): void {
    this.loadProducts();
  }

  public loadProducts() {
    this.httpProduct.getAllProducts('/getAll')
      .subscribe( (resp) => {
        this.products = resp.allProducts;
        console.log(this.products);
      });
  }

}



