import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../../warehouses/services/products.service';
import { Product } from '../../../warehouses/interfaces';
import { ValidatorsService } from '../../../../../shared/service/validators.service';

@Component({
  selector: 'app-create-work-order',
  templateUrl: './create-work-order.component.html',
  styleUrl: './create-work-order.component.css'
})
export class CreateWorkOrderComponent implements OnInit {

  public products: Product[] = [];
  public showTableProductsToSend: boolean = false;

  public httpProduct = inject(ProductsService);
  public fb = inject(FormBuilder);
  public validatorsService = inject(ValidatorsService);

  public myForm: FormGroup = this.fb.group({
    address: ['', [
      Validators.required,
      Validators.pattern(this.validatorsService.alphaNumericWithSignsPattern)
    ]],
    priceOfLabor: [null, [
      Validators.required,
      Validators.pattern(this.validatorsService.numericPattern)
    ]],
    priceOfTransfer: [null, [
      Validators.required,
      Validators.pattern(this.validatorsService.numericPattern)
    ]],
    priceTotal: [null, [
      Validators.required,
      Validators.pattern(this.validatorsService.numericPattern)
    ]],
    productsOfWorkOrder: this.fb.array([], [Validators.required, Validators.minLength(1)]),
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

  isNotValidField( field: string ) {
    return this.validatorsService.isNotValidField(this.myForm, field);
  }

  getFieldError( field: string ) {
    return this.validatorsService.getMessageError(this.myForm, field);
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
        quantity: [null, [
          Validators.required,
          Validators.min(1),
          Validators.pattern(this.validatorsService.numericPattern)
        ]]
      });

      this.productsFormArray.push(productFormGroup);
    }

    if ( this.productsFormArray.length > 0 ) {
      this.showTableProductsToSend = true;
    }
  }


  public removeProduct(index: number): void {
    this.productsFormArray.removeAt(index);
  }



  public sendForm() {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
  }

}




