import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { ListCustomerComponent } from './pages/list-customer/list-customer.component';
import { DetailCustomerComponent } from './pages/detail-customer/detail-customer.component';
import { PrimeNgModule } from '../../../prime-ng/prime-ng.module';
import { CreateCustomerComponent } from './pages/create-customer/create-customer.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListCustomerComponent,
    DetailCustomerComponent,
    CreateCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
  ]
})
export class CustomersModule { }
