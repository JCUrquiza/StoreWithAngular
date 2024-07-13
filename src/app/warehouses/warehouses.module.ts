import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehousesRoutingModule } from './warehouses-routing.module';
import { WarehousesComponent } from './pages/warehouses/warehouses.component';
import { ProductsComponent } from './pages/products/products.component';
import { CompanyComponent } from './pages/company/company.component';
import { WarehousesMovementsComponent } from './pages/warehouses-movements/warehouses-movements.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { CreateCompanyComponent } from './components/company/create-company/create-company.component';
import { ShowCompanyComponent } from './components/company/show-company/show-company.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WarehousesComponent,
    ProductsComponent,
    CompanyComponent,
    WarehousesMovementsComponent,
    CreateCompanyComponent,
    ShowCompanyComponent,
  ],
  imports: [
    CommonModule,
    WarehousesRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
  ]
})
export class WarehousesModule { }
