import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './pages/company/company.component';
import { WarehousesComponent } from './pages/warehouses/warehouses.component';
import { ProductsComponent } from './pages/products/products.component';
import { WarehousesMovementsComponent } from './pages/warehouses-movements/warehouses-movements.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent
  },
  {
    path: 'warehouses',
    component: WarehousesComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'warehouses-movements',
    component: WarehousesMovementsComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehousesRoutingModule { }

