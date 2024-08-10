import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'warehouses',
        loadChildren: () => import('./modules/warehouses/warehouses.module').then( m => m.WarehousesModule )
      },
      {
        path: 'tickets',
        loadChildren: () => import('./modules/tickets/tickets.module').then( m => m.TicketsModule )
      },
      {
        path: 'customers',
        loadChildren: () => import('./modules/customers/customers.module').then( m => m.CustomersModule )
      },
      {
        path: 'user',
        loadChildren: () => import('./modules/users/users.module').then( m => m.UsersModule )
      },
      {
        path: 'workOrder',
        loadChildren: () => import('./modules/work-order/work-order.module').then( m => m.WorkOrderModule )
      },
      {
        path: '',
        redirectTo: 'tickets',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
