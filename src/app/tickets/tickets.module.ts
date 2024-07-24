import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';

import { ChartTicketsComponent } from './pages/chart-tickets/chart-tickets.component';
import { ListTicketsComponent } from './pages/list-tickets/list-tickets.component';

import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';
import { DetailTicketsComponent } from './components/detail-tickets/detail-tickets.component';



@NgModule({
  declarations: [
    ChartTicketsComponent,
    ListTicketsComponent,
    CreateTicketComponent,
    DetailTicketsComponent,
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule
  ]
})
export class TicketsModule { }
