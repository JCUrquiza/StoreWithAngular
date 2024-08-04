import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCustomerComponent } from './pages/list-customer/list-customer.component';
import { CreateCustomerComponent } from './pages/create-customer/create-customer.component';
import { DetailCustomerComponent } from './pages/detail-customer/detail-customer.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateCustomerComponent
  },
  {
    path: 'list',
    component: ListCustomerComponent
  },
  {
    path: 'details',
    component: DetailCustomerComponent
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
