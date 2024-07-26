import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketsResponse } from '../interfaces/tickets.interface';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  public apiBase: string = 'http://localhost:3000/api/v1/tickets';

  public actionTickets = {
    list: false,
    create: false,
    update: false,
  }

  constructor(
    private http: HttpClient
  ) {}

  showActionOfCrud(action: string) {

    this.actionTickets.list = false;
    this.actionTickets.create = false;
    this.actionTickets.update = false;

    switch (action) {
      case 'list':
        this.actionTickets.list = true;
        break;
      case 'create':
        this.actionTickets.create = true;
        break;
      case 'update':
        this.actionTickets.update = true;
        break;
      default:
        break;
    }

    return this.actionTickets;

  }

  getAllTickets(url: string): Observable<TicketsResponse> {
    return this.http.get<TicketsResponse>( this.apiBase + url );
  }

}
