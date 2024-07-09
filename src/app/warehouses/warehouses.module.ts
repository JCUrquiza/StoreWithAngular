import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehousesRoutingModule } from './warehouses-routing.module';
import { WarehousesComponent } from './pages/warehouses/warehouses.component';
import { ProductsComponent } from './pages/products/products.component';
import { CompanyComponent } from './pages/company/company.component';
import { WarehousesMovementsComponent } from './pages/warehouses-movements/warehouses-movements.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';


@NgModule({
  declarations: [
    WarehousesComponent,
    ProductsComponent,
    CompanyComponent,
    WarehousesMovementsComponent
  ],
  imports: [
    CommonModule,
    WarehousesRoutingModule,
    PrimeNgModule
  ]
})
export class WarehousesModule { }
