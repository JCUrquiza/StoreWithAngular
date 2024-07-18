import { Component, OnInit } from '@angular/core';
import { WarehousesService } from '../../../services/warehouses.service';
import { BranchesOffice, Product, Warehouse } from '../../../interfaces';
import { BranchOfficeService } from '../../../services/branch-office.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { ValidatorsService } from '../../../../shared/service/validators.service';

@Component({
  selector: 'transfer-products-same-branch',
  templateUrl: './transfer-products-same-branch.component.html',
  styleUrl: './transfer-products-same-branch.component.css'
})
export class TransferProductsSameBranchComponent implements OnInit {

  public branchOfficess: BranchesOffice[] = [];
  public warehouses: Warehouse[] = [];
  public products: Product[] = [];

  public myForm: FormGroup = this.fb.group({
    branchOfficeId: ['', [Validators.required]],
    warehouseSourceId: ['', [Validators.required]],
    warehouseTargetId: ['', [Validators.required]],
    products: [[], [Validators.required]]
  });

  constructor(
    private branchOfficeService: BranchOfficeService,
    private warehousesService: WarehousesService,
    private productsService: ProductsService,
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
  ) {}

  ngOnInit(): void {
    this.loadBranchOffices();
    this.loadWarehouses();
    this.loadProducts();
  }

  public loadBranchOffices(): void {
    this.branchOfficeService.getAll('/getAll')
      .subscribe( resp => {
        console.log(resp);
        this.branchOfficess = resp.branchesOffices;
      });
  }

  public loadWarehouses(): void {
    this.warehousesService.getWarehouses('/getAll')
      .subscribe( resp => {
        console.log(resp);
        this.warehouses = resp.warehouses;
      });
  }

  public loadProducts(): void {
    this.productsService.getAllProducts('/getAll')
      .subscribe( resp => {
        console.log(resp);
        this.products = resp.allProducts;
      })
  }

  isNotValidField(field: string) {
    return this.validatorsService.isNotValidField(this.myForm, field);
  }

  getFieldError( field: string ) {
    return this.validatorsService.getMessageError(this.myForm, field);
  }

  saveForm() {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log( this.myForm.value );
  }

}
