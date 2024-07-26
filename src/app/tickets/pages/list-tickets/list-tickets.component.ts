import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { Ticket } from '../../interfaces/tickets.interface';

@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrl: './list-tickets.component.css'
})
export class ListTicketsComponent implements OnInit {

  public ticketsList: Ticket[] = [];

  public actionOfCrudFromService = {
    list: false,
    create: false,
    update: false,
  };

  constructor(
    private ticketsService: TicketsService
  ) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  public showActions(action: string): void {
    this.actionOfCrudFromService = this.ticketsService.showActionOfCrud(action);
  }

  loadTickets(): void {
    this.ticketsService.getAllTickets('/getAll')
      .subscribe( resp => {
        console.log(resp);
        this.ticketsList = resp.tickets;
      });
  }

  public getSeverity(statusCode: string): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined {

    switch(statusCode) {
      case 'penrev':
        return 'info';
      case 'Atendo':
        return 'danger';
      case 'Reslto':
        return 'success';
      default:
        return undefined;
    }

  }

}
