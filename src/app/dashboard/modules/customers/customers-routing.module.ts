import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCustomerComponent } from './pages/list-customer/list-customer.component';
import { CreateCustomerComponent } from './pages/create-customer/create-customer.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateCustomerComponent
  },
  {
    path: 'list',
    component: ListCustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
