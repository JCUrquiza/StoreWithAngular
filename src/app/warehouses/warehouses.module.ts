import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehousesRoutingModule } from './warehouses-routing.module';
import { CreatingWarehousesComponent } from './pages/creating-warehouses/creating-warehouses.component';
import { UpdateWarehousesComponent } from './pages/update-warehouses/update-warehouses.component';


@NgModule({
  declarations: [
    CreatingWarehousesComponent,
    UpdateWarehousesComponent
  ],
  imports: [
    CommonModule,
    WarehousesRoutingModule
  ]
})
export class WarehousesModule { }
