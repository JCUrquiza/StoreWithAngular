import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from './auth/guards';
// import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [ isNotAuthenticatedGuard ],
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: 'dashboard',
    canActivate: [ isAuthenticatedGuard ],
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
