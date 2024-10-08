import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkOrderRoutingModule } from './work-order-routing.module';
import { ListWorkOrderComponent } from './pages/list-work-order/list-work-order.component';
import { CreateWorkOrderComponent } from './pages/create-work-order/create-work-order.component';
import { DetailsWorkOrderComponent } from './pages/details-work-order/details-work-order.component';
import { PrimeNgModule } from '../../../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListWorkOrderComponent,
    CreateWorkOrderComponent,
    DetailsWorkOrderComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
    WorkOrderRoutingModule,
  ]
})
export class WorkOrderModule { }
