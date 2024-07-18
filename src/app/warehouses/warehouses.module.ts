import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { WarehousesRoutingModule } from './warehouses-routing.module';
import { WarehousesComponent } from './pages/warehouses/warehouses.component';
import { ProductsComponent } from './pages/products/products.component';
import { CompanyComponent } from './pages/company/company.component';
import { WarehousesMovementsComponent } from './pages/warehouses-movements/warehouses-movements.component';
import { CreateCompanyComponent } from './components/company/create-company/create-company.component';
import { ShowCompanyComponent } from './components/company/show-company/show-company.component';
import { CreateWarehousesComponent } from './components/warehouses/create-warehouses/create-warehouses.component';
import { ShowWarehousesComponent } from './components/warehouses/show-warehouses/show-warehouses.component';
import { BranchOfficesComponent } from './pages/branch-offices/branch-offices.component';
import { CreateBranchofficeComponent } from './components/branchOffices/create-branchoffice/create-branchoffice.component';
import { ShowBranchofficeComponent } from './components/branchOffices/show-branchoffice/show-branchoffice.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { ShowProductComponent } from './components/products/show-product/show-product.component';
import { TransferProductsSameBranchComponent } from './components/warehousesMovements/transfer-products-same-branch/transfer-products-same-branch.component';
import { TransferProductsDifferentBranchesComponent } from './components/warehousesMovements/transfer-products-different-branches/transfer-products-different-branches.component';


@NgModule({
  declarations: [
    WarehousesComponent,
    ProductsComponent,
    CompanyComponent,
    WarehousesMovementsComponent,
    CreateCompanyComponent,
    ShowCompanyComponent,
    CreateWarehousesComponent,
    ShowWarehousesComponent,
    BranchOfficesComponent,
    CreateBranchofficeComponent,
    ShowBranchofficeComponent,
    CreateProductComponent,
    ShowProductComponent,
    TransferProductsSameBranchComponent,
    TransferProductsDifferentBranchesComponent,
  ],
  imports: [
    CommonModule,
    WarehousesRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
  ]
})
export class WarehousesModule { }
