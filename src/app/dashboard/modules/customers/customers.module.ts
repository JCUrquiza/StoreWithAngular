import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { ListCustomerComponent } from './pages/list-customer/list-customer.component';
import { DetailCustomerComponent } from './pages/detail-customer/detail-customer.component';


@NgModule({
  declarations: [
    ListCustomerComponent,
    DetailCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule
  ]
})
export class CustomersModule { }
