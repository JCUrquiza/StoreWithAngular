import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../warehouses/services/products.service';
import { Product, ProductWorkOrder } from '../../../warehouses/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-work-order',
  templateUrl: './create-work-order.component.html',
  styleUrl: './create-work-order.component.css'
})
export class CreateWorkOrderComponent implements OnInit {

  public products: Product[] = [];
  public productsOfWorkOrder: ProductWorkOrder[] = [];

  public httpProduct = inject(ProductsService);
  public fb = inject(FormBuilder);

  public myForm: FormGroup = this.fb.group({
    address: ['', [Validators.required]],
    priceOfLabor: [0, [Validators.required]],
    priceOfTransfer: [0, [Validators.required]],
    priceTotal: [0, [Validators.required]],
  });

  ngOnInit(): void {
    this.loadProducts();
  }

  public loadProducts() {
    this.httpProduct.getAllProducts('/getAll')
      .subscribe( (resp) => {
        this.products = resp.allProducts;
      });
  }

  public addProduct(product: Product): void {
    const found = this.productsOfWorkOrder.find( (element) => element.codigoSKU == product.codigoSKU );

    if ( found == undefined ) {
      this.productsOfWorkOrder.push({
        id: product.id,
        name: product.name,
        codigoSKU: product.codigoSKU,
        familyname: product.productFamily.name,
        quantity: 0
      });
    }

  }

  public sendForm() {
    console.log(this.myForm.value);
  }

}



