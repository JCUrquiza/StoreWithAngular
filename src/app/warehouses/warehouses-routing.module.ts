import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatingWarehousesComponent } from './pages/creating-warehouses/creating-warehouses.component';
import { UpdateWarehousesComponent } from './pages/update-warehouses/update-warehouses.component';

const routes: Routes = [
  {
    path: '',
    component: CreatingWarehousesComponent
  },
  {
    path: 'update',
    component: UpdateWarehousesComponent
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
