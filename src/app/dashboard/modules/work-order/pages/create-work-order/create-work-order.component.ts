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
  public productForm: FormGroup;

  public httpProduct = inject(ProductsService);
  private fb = inject(FormBuilder);

  constructor() {
    this.productForm = this.fb.group({
      products: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  get productsFormArray(): FormArray {
    return this.productForm.get('products') as FormArray;
  }

  private createProductFormGroup(product: Product): FormGroup {
    return this.fb.group({
      id: [product.id],
      codigoSKU: [product.codigoSKU],
      family: [product.productFamily.name],
      name: [product.name],
      quantity: [''],
    });
  }

  public loadProducts() {
    this.httpProduct.getAllProducts('/getAll')
      .subscribe( (resp) => {
        this.products = resp.allProducts;
        this.products.forEach( product => {
          this.productsFormArray.push(this.createProductFormGroup(product));
        });
      });
  }

  public getFormData() {
    console.log(this.productForm.value);
  }

}



