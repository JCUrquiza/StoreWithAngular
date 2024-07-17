import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { ProductsService } from '../../../services/products.service';
import { ProductFamily } from '../../../interfaces';
import { ValidatorsService } from '../../../../shared/service/validators.service';

@Component({
  selector: 'create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit {

  public productFamily: ProductFamily[] | undefined;
  public showDialogToCreateProductFamily: boolean = false;

  public myForm: FormGroup = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.pattern(this.validatorsService.alphaNumericWithSignsPattern)
    ]],
    codigoSKU: ['', [
      Validators.required,
      Validators.pattern(this.validatorsService.alphaNumericWithSignsPattern)
    ]],
    salePrice: [0, [
      Validators.required, Validators.pattern(this.validatorsService.numericPattern)
    ]],
    productFamilyId: [null, [Validators.required]]
  });

  public myFormFamilyProduct: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]]
  });

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private validatorsService: ValidatorsService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.loadProductFamily();
  }

  public loadProductFamily() {
    this.productsService.getAllProductFamilies('/getAll')
      .subscribe( resp => {
        console.log(resp);
        this.productFamily = resp.productFamilies;
      })
  }

  isNotValidField( field: string, form: string = 'product' ) {
    if ( form == 'family' ) {
      return this.validatorsService.isNotValidField(this.myFormFamilyProduct, field);
    }
    return this.validatorsService.isNotValidField(this.myForm, field);
  }

  getFieldError( field: string, form: string = 'product' ) {
    if ( form == 'family') {
      return this.validatorsService.getMessageError(this.myFormFamilyProduct, field);
    }
    return this.validatorsService.getMessageError(this.myForm, field);
  }


  openCreateDialog(): void {
    this.showDialogToCreateProductFamily = true;
  }

  saveProductFamily(): void {

    if ( this.myFormFamilyProduct.invalid ) {
      this.myFormFamilyProduct.markAllAsTouched();
      return;
    };

    const body = {
      name: this.myFormFamilyProduct.value.name,
      // companyId: this.editForm.value.idCompany
    }
    this.productsService.createProductFamily('/create', body).pipe(
      tap({
        next: (resp) => {
          console.log(resp);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product Family created successfully' });
          this.loadProductFamily();
          this.myFormFamilyProduct.reset({
            name: '',
          });
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error });
        }
      })
    ).subscribe();

    this.showDialogToCreateProductFamily = false;
  }

  public saveProduct(): void {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const body = {
      name: this.myForm.value.name,
      codigoSKU: this.myForm.value.codigoSKU,
      salePrice: this.myForm.value.salePrice,
      productFamilyId: this.myForm.value.productFamilyId.id
    }
    console.log(body);
    this.productsService.createProduct('/create', body).pipe(
      tap({
        next: (resp) => {
          console.log(resp);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product created successfully' });
          this.myForm.reset({
            name: '',
            codigoSKU: '',
            salePrice: 0,
            productFamilyId: null
          });
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error });
        }
      })
    ).subscribe();

  }

}
