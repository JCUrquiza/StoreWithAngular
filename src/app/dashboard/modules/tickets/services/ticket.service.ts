import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogueResponse, TicketsResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private apiBaseTickets: string = 'http://localhost:3000/api/v1/tickets';
  private apiBaseCatalogue: string = 'http://localhost:3000/api/v1/catalogue';

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

  public getAllTickets(url: string): Observable<TicketsResponse> {
    return this.http.get<TicketsResponse>( this.apiBaseTickets + url );
  }

  public getAllCatalogue( url: string ): Observable<CatalogueResponse> {
    return this.http.get<CatalogueResponse>( this.apiBaseCatalogue + url );
  }

  public createTicket(url: string, body: any) {
    return this.http.post( this.apiBaseTickets + url, body );
  }

  public attendTicket(url: string, id: number) {
    return this.http.get( this.apiBaseTickets + url + '/' + id );
  }

}
