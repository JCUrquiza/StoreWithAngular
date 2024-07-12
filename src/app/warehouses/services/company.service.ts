import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyResponse } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiURL = 'http://localhost:3000/api/company';

  constructor( private http: HttpClient ) {}

  getCompanies(api: string): Observable<CompanyResponse> {
    return this.http.get<CompanyResponse>(this.apiURL + api);
  }

  createCompany(api: string, body: any): Observable<any> {
    return this.http.post(this.apiURL + api, body);
  }

  deleteCompany(api: string, id: number) {
    return this.http.delete(`${this.apiURL}${api}/${id}`);
  }

}
