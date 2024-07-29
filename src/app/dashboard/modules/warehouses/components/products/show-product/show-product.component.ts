import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { ValidatorsService } from '../../../../../../shared/service/validators.service';


@Component({
  selector: 'show-product',
  templateUrl: './show-product.component.html',
  styleUrl: './show-product.component.css'
})
export class ShowProductComponent implements OnInit {

  public products: Product[] = [];
  public editForm: FormGroup;

  public showDialogToUpdateProduct: boolean = false;

  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
    this.editForm = this.fb.group({
      id: [null],
      name: ['', [
        Validators.required,
        Validators.pattern(this.validatorsService.alphaNumericWithSignsPattern)
      ]],
      salePrice: [0, [
        Validators.required,
        Validators.pattern(this.validatorsService.numericPattern)
      ]]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  public loadProducts() {
    this.productsService.getAllProducts('/getAll')
      .subscribe( resp => {
        console.log(resp);
        this.products = resp.allProducts;
      });
  }

  public openEditDialog(product: Product) {
    console.log(product);
    this.editForm.patchValue({
      id: product.id,
      name: product.name,
      salePrice: product.salePrice
    });
    this.showDialogToUpdateProduct = true;
  }

  isNotValidField( field: string ) {
    return this.validatorsService.isNotValidField(this.editForm, field);
  }

  getFieldError( field: string ) {
    return this.validatorsService.getMessageError(this.editForm, field);
  }

  public saveProduct() {
    console.log( this.editForm.value );
    const idProduct = this.editForm.value.id;
    const body = {
      name: this.editForm.value.name,
      salePrice: this.editForm.value.salePrice
    }
    this.productsService.updateProduct('/update', idProduct, body).pipe(
      tap({
        next: (resp) => {
          console.log(resp);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product updated successfully' });
          this.loadProducts();
          this.editForm.reset({
            id: null,
            name: '',
            salePrice: 0
          });
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error });
        }
      })
    ).subscribe();

    this.showDialogToUpdateProduct = false;
  }

  confirmDelete(id: number): void {
    this.confirmationService.confirm({
      header: 'Are you sure you want to delete this item?',
      message: 'Please, confirm to proceed with the deletion',
      accept: () => {
        this.deleteProduct(id);
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Cancelar', detail: 'You have cancelled the action.', life: 3000 });
      }
    });
  }

  public deleteProduct(id: number) {
    this.productsService.deleteProduct('/delete', id)
      .subscribe( resp => {
        console.log(resp);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product deleted successfully' });
        this.loadProducts();
      });
  }

}
