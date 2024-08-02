import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environments';
import { Observable } from 'rxjs';
import { CustomerResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseURL: string = `${ environment.baseUrl }/api/v1/customer`;

  constructor(
    private http: HttpClient
  ) {}

  getAllCustomers(url: string): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>( this.baseURL + url );
  }

}
