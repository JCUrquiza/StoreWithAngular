import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { ListTicketsComponent } from './pages/list-tickets/list-tickets.component';
import { ChartTicketsComponent } from './pages/chart-tickets/chart-tickets.component';
import { PrimeNgModule } from '../../../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListTicketsComponent,
    ChartTicketsComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
    TicketsRoutingModule
  ]
})
export class TicketsModule { }
