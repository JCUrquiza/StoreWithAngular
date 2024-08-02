import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseURL: string = `${ environment.baseUrl }/api/v1/customer`;

  constructor(
    private http: HttpClient
  ) {}

  getAllCustomers(url: string) {
    return this.http.get( this.baseURL + url );
  }

}
