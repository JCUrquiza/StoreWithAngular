import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { ProductsService } from '../../../warehouses/services/products.service';
import { Product } from '../../../warehouses/interfaces';
import { ValidatorsService } from '../../../../../shared/service/validators.service';
import { WorkOrderService } from '../../services/work-order.service';

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
  public workOrderService = inject(WorkOrderService);
  public messageService = inject(MessageService);

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
    productsOfWorkOrder: this.fb.array([], [Validators.required]),
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
        quantity: [0, [
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

    // Array para almacenar los productos formateados para enviar
    const productsToSend: { id: number, quantity: number }[] = [];

    const productsArray = this.myForm.get('productsOfWorkOrder')?.getRawValue();
    productsArray.forEach((product: any) => {
      productsToSend.push({
        id: product.id,
        quantity: +product.quantity
      });
    });

    const body = {
      address: this.myForm.value.address,
      priceOfLabor: +this.myForm.value.priceOfLabor,
      priceOfTransfer: +this.myForm.value.priceOfTransfer,
      priceTotal: +this.myForm.value.priceTotal,
      customerId: 11,
      products: productsToSend
    }
    this.workOrderService.create('/create', body).pipe(
      tap({
        next: (resp) => {
          console.log(resp);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Work Order created successfully' });
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error });
        }
      })
    ).subscribe();

  }

}




