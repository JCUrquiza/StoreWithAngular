import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { Catalogue, Ticket } from '../../interfaces';
import { TicketsService } from '../../services/ticket.service';
import { ValidatorsService } from '../../../../../shared/service/validators.service';
// import { TicketsService } from '../../services/tickets.service';
// import { Catalogue, Ticket } from '../../interfaces/tickets.interface';
// import { ValidatorsService } from '../../../shared/service/validators.service';

@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrl: './list-tickets.component.css'
})
export class ListTicketsComponent implements OnInit {

  public ticketsList: Ticket[] = [];
  public catalogueList: Catalogue[] = [];

  public showDialogAttendTicket: boolean = false;
  public showDialogNewTicket: boolean = false;

  public actionOfCrudFromService = {
    list: false,
    create: false,
    update: false,
  };

  public newTicketForm: FormGroup = this.fb.group({
    categoryId: [null, [Validators.required]],
    description: ['', [Validators.required]]
  });

  public ticketForm: FormGroup = this.fb.group({
    id: [''],
    category: [''],
    description: ['']
  });

  constructor(
    private ticketsService: TicketsService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private validatorsService: ValidatorsService,
  ) {}

  ngOnInit(): void {
    this.loadTickets();
    this.loadCatalogue();
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

  loadCatalogue(): void {
    this.ticketsService.getAllCatalogue('/getAll')
      .subscribe( resp => {
        this.catalogueList = resp.catalogue;
      })
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

  public createNewTicket() {
    this.showDialogNewTicket = true;
  }

  isNotValidField( field: string ) {
    return this.validatorsService.isNotValidField(this.newTicketForm, field);
  }

  getFieldError( field: string ) {
    return this.validatorsService.getMessageError(this.newTicketForm, field);
  }


  public sendNewTicket() {
    const body = {
      description: this.newTicketForm.value.description,
      catalogueId: this.newTicketForm.value.categoryId.id,
    }

    const token = localStorage.getItem('token');

    this.ticketsService.createTicket('/create', body, token).pipe(
      tap({
        next: (resp) => {
          console.log(resp);
          this.loadTickets();
        },
        error: (error) => {
          console.log(error);
        }
      })
    ).subscribe();

    this.showDialogNewTicket = false;
  }


  public openDialogTicket(ticket: Ticket) {
    this.showDialogAttendTicket = true;
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

    this.showDialogAttendTicket = false;
  }

}
