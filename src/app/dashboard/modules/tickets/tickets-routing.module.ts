import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTicketsComponent } from './pages/list-tickets/list-tickets.component';
import { ChartTicketsComponent } from './pages/chart-tickets/chart-tickets.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListTicketsComponent
  },
  {
    path: 'chart',
    component: ChartTicketsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
