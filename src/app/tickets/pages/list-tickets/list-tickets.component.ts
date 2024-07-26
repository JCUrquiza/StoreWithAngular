import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { Ticket } from '../../interfaces/tickets.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrl: './list-tickets.component.css'
})
export class ListTicketsComponent implements OnInit {

  public ticketsList: Ticket[] = [];
  public showDialogTicket: boolean = false;

  public actionOfCrudFromService = {
    list: false,
    create: false,
    update: false,
  };

  public ticketForm: FormGroup;

  constructor(
    private ticketsService: TicketsService,
    private fb: FormBuilder,
    private messageService: MessageService,
  ) {
    this.ticketForm = this.fb.group({
      id: [''],
      category: [''],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadTickets();
  }

  public showActions(action: string): void {
    this.actionOfCrudFromService = this.ticketsService.showActionOfCrud(action);
  }

  loadTickets(): void {
    this.ticketsService.getAllTickets('/getAll')
      .subscribe( resp => {
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

  public openDialogTicket(ticket: Ticket) {
    this.showDialogTicket = true;
    this.ticketForm.patchValue({
      id: ticket.id,
      category: ticket.catalogue.name,
      description: ticket.description
    });
  }

  public attendTicket(): void {
    const id = this.ticketForm.value.id;
    this.ticketsService.attendTicket('/attending', id).pipe(
      tap({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Ticket updated successfully' });
          this.loadTickets();
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error });
        }
      })
    ).subscribe();

    this.showDialogTicket = false;
  }

}
