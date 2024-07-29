import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './pages/company/company.component';
import { WarehousesComponent } from './pages/warehouses/warehouses.component';
import { ProductsComponent } from './pages/products/products.component';
import { WarehousesMovementsComponent } from './pages/warehouses-movements/warehouses-movements.component';
import { BranchOfficesComponent } from './pages/branch-offices/branch-offices.component';

const routes: Routes = [
  {
    path: 'company',
    component: CompanyComponent
  },
  {
    path: 'branch-offices',
    component: BranchOfficesComponent
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

