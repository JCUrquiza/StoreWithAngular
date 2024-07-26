import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule )
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
  // {
  //   path: 'warehouses',
  //   loadChildren: () => import('./warehouses/warehouses.module').then( m => m.WarehousesModule ),
  // },
  // {
  //   path: 'tickets',
  //   loadChildren: () => import('./tickets/tickets.module').then( m => m.TicketsModule ),
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
