import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { BranchesOffice, ProductsInWarehouse, Warehouse } from '../../../interfaces';
import { BranchOfficeService } from '../../../services/branch-office.service';
import { WarehousesService } from '../../../services/warehouses.service';
import { ValidatorsService } from '../../../../shared/service/validators.service';
import { ProductsInWarehousesService } from '../../../services/products-in-warehouses.service';

@Component({
  selector: 'show-warehouses',
  templateUrl: './show-warehouses.component.html',
  styleUrl: './show-warehouses.component.css'
})
export class ShowWarehousesComponent implements OnInit {

  public products: ProductsInWarehouse[] = [];
  public branchOffices: BranchesOffice[] = [];
  public warehouses: Warehouse[] = [];

  public myForm: FormGroup = this.fb.group({
    branchOfficeId: ['', [Validators.required]],
    warehouseId: ['', [Validators.required]],
  });

  public myFormProduct: FormGroup = this.fb.group({
    id: [0],
    family: [''],
    name: [''],
    quantity: [null, [Validators.required, Validators.pattern(this.validatorsService.numericPattern)]],
  });

  public showTableProducts: boolean = false;
  public showDialogToUpdateProduct: boolean = false;

  constructor(
    private branchOfficeService: BranchOfficeService,
    private warehousesService: WarehousesService,
    private validatorsService: ValidatorsService,
    private fb: FormBuilder,
    private productsInWarehousesService: ProductsInWarehousesService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.loadBranchOffice();
    this.loadWarehouses();
  }

  public loadBranchOffice() {
    this.branchOfficeService.getAll('/getAll')
      .subscribe( resp => {
        this.branchOffices = resp.branchesOffices;
      });
  }

  public loadWarehouses() {
    this.warehousesService.getWarehouses('/getAll')
      .subscribe( resp => {
        this.warehouses = resp.warehouses;
      });
  }

  isNotValidField(field: string, form: string = 'warehouse') {
    if (form == 'product') {
      return this.validatorsService.isNotValidField(this.myFormProduct, field);
    }
    return this.validatorsService.isNotValidField(this.myForm, field);
  }

  getFieldError(field: string, form: string = 'warehouse') {
    if (form == 'product') {
      return this.validatorsService.getMessageError(this.myForm, field);
    }
    return this.validatorsService.getMessageError(this.myForm, field);
  }

  public sendFormToConsultProducts(): void {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    const body = {
      branchOfficeId: this.myForm.value.branchOfficeId.id,
      warehouseId: this.myForm.value.warehouseId.id,
    }
    this.productsInWarehousesService.getProductsByWarehouse('/getProductsByWarehouse', body).pipe(
      tap({
        next: (resp) => {
          console.log(resp);
          this.products = [];
          this.products = resp.productsInWarehouse;
          this.showTableProducts = true;
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error });
          this.showTableProducts = false;
        }
      })
    ).subscribe();

  }



  public openEditDialog(product: any) {
    this.myFormProduct.patchValue({
      id: product.id,
      family: product.product.productFamily.name,
      name: product.product.name,
      quantity: product.quantity
    });
    this.showDialogToUpdateProduct = true;
  }

  public saveProduct() {
    const idProductInWarehouse = this.myFormProduct.value.id;

    const body = {
      quantity: this.myFormProduct.value.quantity
    }
    this.productsInWarehousesService.updateQuantityOfProduct('/updateQuantity', idProductInWarehouse, body).pipe(
      tap({
        next: (resp) => {
          console.log(resp);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product updated successfully' });
          this.sendFormToConsultProducts();
          this.showDialogToUpdateProduct = false;
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error });
        }
      })
    ).subscribe();

  }

}
