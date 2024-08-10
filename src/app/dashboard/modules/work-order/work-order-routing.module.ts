import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateWorkOrderComponent } from './pages/create-work-order/create-work-order.component';
import { ListWorkOrderComponent } from './pages/list-work-order/list-work-order.component';
import { DetailsWorkOrderComponent } from './pages/details-work-order/details-work-order.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateWorkOrderComponent
  },
  {
    path: 'list',
    component: ListWorkOrderComponent
  },
  {
    path: 'details',
    component: DetailsWorkOrderComponent
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
export class WorkOrderRoutingModule { }
