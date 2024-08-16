import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../warehouses/services/products.service';
import { Product, ProductWorkOrder } from '../../../warehouses/interfaces';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-work-order',
  templateUrl: './create-work-order.component.html',
  styleUrl: './create-work-order.component.css'
})
export class CreateWorkOrderComponent implements OnInit {

  public products: Product[] = [];
  // public productsOfWorkOrder: ProductWorkOrder[] = [];

  public httpProduct = inject(ProductsService);
  public fb = inject(FormBuilder);

  public myForm: FormGroup = this.fb.group({
    address: ['', [Validators.required]],
    priceOfLabor: [0, [Validators.required]],
    priceOfTransfer: [0, [Validators.required]],
    priceTotal: [0, [Validators.required]],
    productsOfWorkOrder: this.fb.array([]),
  });

  ngOnInit(): void {
    this.loadProducts();
  }

  get productsFormArray(): FormArray {
    return this.myForm.get('productsOfWorkOrder') as FormArray;
  }

  public loadProducts() {
    this.httpProduct.getAllProducts('/getAll')
      .subscribe( (resp) => {
        this.products = resp.allProducts;
      });
  }

  public addProduct(product: Product): void {
    // const found = this.productsOfWorkOrder.find( (element) => element.codigoSKU == product.codigoSKU );
    const existingProduct = this.productsFormArray.controls.find(
      (ctrl) => ctrl.value.codigoSKU === product.codigoSKU
    );

    if ( !existingProduct ) {
      const productFormGroup = this.fb.group({
        id: [product.id, Validators.required],
        name: [product.name, Validators.required],
        codigoSKU: [product.codigoSKU, Validators.required],
        familyname: [product.productFamily.name, Validators.required],
        quantity: [null, [Validators.required, Validators.min(1)]]
      });

      this.productsFormArray.push(productFormGroup);
    }
  }


  public removeProduct(index: number): void {
    this.productsFormArray.removeAt(index);
  }

  public sendForm() {
    console.log(this.myForm.value);
  }

}




