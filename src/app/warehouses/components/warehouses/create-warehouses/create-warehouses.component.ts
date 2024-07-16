import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { ValidatorsService } from '../../../../shared/service/validators.service';
import { BranchesOffice, Product, Warehouse } from '../../../interfaces';
import { WarehousesService } from '../../../services/warehouses.service';
import { ProductsService } from '../../../services/products.service';
import { BranchOfficeService } from '../../../services/branch-office.service';
import { ProductsInWarehousesService } from '../../../services/products-in-warehouses.service';

@Component({
  selector: 'create-warehouses',
  templateUrl: './create-warehouses.component.html',
  styleUrl: './create-warehouses.component.css'
})
export class CreateWarehousesComponent implements OnInit {

  public products: Product[] = [];
  public branchOffices: BranchesOffice[] = [];
  public warehouses: Warehouse[] = [];

  public showDialogToAssignProduct: boolean = false;

  public myForm: FormGroup = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(this.validatorsService.alphaNumericWithSignsPattern)
    ]]
  });

  public myFormProduct: FormGroup = this.fb.group({
    branchOfficeId: ['', [Validators.required]],
    warehouseId: ['', [Validators.required]],
    productId: ['', [Validators.required]],
    quantity: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private warehousesService: WarehousesService,
    private messageService: MessageService,
    private productsService: ProductsService,
    private branchOfficeService: BranchOfficeService,
    private productsInWarehousesService: ProductsInWarehousesService,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  public loadBranchOffice() {
    this.branchOfficeService.getAll('/getAll')
      .subscribe( resp => {
        console.log(resp);
        this.branchOffices = resp.branchesOffices;
      });
  }

  public loadWarehouses() {
    this.warehousesService.getWarehouses('/getAll')
      .subscribe( resp => {
        console.log(resp);
        this.warehouses = resp.warehouses;
      });
  }

  public loadProducts() {
    this.productsService.getAllProducts('/getAll')
      .subscribe( resp => {
        console.log(resp);
        this.products = resp.allProducts;
      });
  }


  isNotValidField(field: string, form: string = 'warehouse') {
    if (form == 'product') {
      return this.validatorsService.isNotValidField(this.myFormProduct, field);
    }
    return this.validatorsService.isNotValidField(this.myForm, field);
  }

  getFieldError(field: string, form: string = 'warehouse') {
    if ( form == 'product' ) {
      return this.validatorsService.getMessageError(this.myFormProduct, field);
    }
    return this.validatorsService.getMessageError(this.myForm, field);
  }

  sendForm() {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    const body = {
      name: this.myForm.value.name
    }
    this.warehousesService.createWarehouse('/create', body).pipe(
      tap({
        next: (resp) => {
          console.log(resp);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Warehouse created successfully' });
          this.myForm.reset({
            name: '',
          });
          this.loadWarehouses();
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error });
        }
      })
    ).subscribe();

  }



  public openEditDialog(product: Product) {
    console.log(product);

    // Si ya fue tocado, que se conserve el valor
    let branchOfficeValue = '';
    if ( this.myFormProduct.get('branchOfficeId')!.touched ) {
      branchOfficeValue = this.myFormProduct.value.branchOfficeId;
    }
    let warehouseValue = '';
    if ( this.myFormProduct.get('warehouseId')!.touched ) {
      warehouseValue = this.myFormProduct.value.warehouseId;
    }

    this.myFormProduct.patchValue({
      branchOfficeId: branchOfficeValue,
      warehouseId: warehouseValue,
      productId: product.id,
      quantity: '',
    });
    this.loadBranchOffice();
    this.loadWarehouses();
    this.showDialogToAssignProduct = true;
  }

  public saveProduct() {

    if ( this.myFormProduct.invalid ) {
      this.myFormProduct.markAllAsTouched();
      return;
    }

    const body = {
      branchOfficeId: this.myFormProduct.value.branchOfficeId.id,
      warehouseId: this.myFormProduct.value.warehouseId.id,
      productId: this.myFormProduct.value.productId,
      quantity: this.myFormProduct.value.quantity
    }

    this.productsInWarehousesService.saveProductInWarehouse('/create', body).pipe(
      tap({
        next: (resp) => {
          console.log(resp);
        },
        error: (error) => {
          console.log(error);
        }
      })
    ).subscribe();

  }

}
