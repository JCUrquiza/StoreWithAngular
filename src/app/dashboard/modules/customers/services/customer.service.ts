import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environments';
import { CustomerResponse, TypeCustomerResponse } from '../interfaces';
import { BranchOfficeResponse } from '../../warehouses/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseURL: string = `${ environment.baseUrl }/api/v1/customer`;
  private baseURLBranchOffice: string = `${ environment.baseUrl }/api/v1/branchesOffices`;

  constructor(
    private http: HttpClient
  ) {}

  getTypeCustomers(url: string): Observable<TypeCustomerResponse> {
    return this.http.get<TypeCustomerResponse>( this.baseURL + url );
  }

  getBranchOffices(url: string): Observable<BranchOfficeResponse> {
    return this.http.get<BranchOfficeResponse>( this.baseURLBranchOffice + url );
  }

  createCustomer(url: string, body: any) {
    return this.http.post( this.baseURL + url, body );
  }

  getAllCustomers(url: string): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>( this.baseURL + url );
  }

}
