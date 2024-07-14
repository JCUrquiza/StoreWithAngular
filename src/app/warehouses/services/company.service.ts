import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Company, CompanyResponse, UpdateCompanyResponse } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiURL = 'http://localhost:3000/api/v1/company';

  public componentCompanyState = {
    create: false,
    read: false,
  };

  public companiesSaved: Company[] = [];

  constructor( private http: HttpClient ) {}


  showActionOFCrudCompany(action: string) {

    this.componentCompanyState.create = false;
    this.componentCompanyState.read = false;

    switch (action) {
      case 'create':
        this.componentCompanyState.create = true;
        break;
      case 'read':
        this.componentCompanyState.read = true;
        break;
      default:
        break;
    }

    return this.componentCompanyState;
  }


  getCompanies(api: string): Observable<CompanyResponse> {
    return this.http.get<CompanyResponse>(this.apiURL + api).pipe(
      tap( response => {
        this.companiesSaved = response.company.map( c => ({ id: c.id, name: c.name, email: c.email, address: c.address }));
      })
    );
  }

  createCompany(api: string, body: any): Observable<any> {
    return this.http.post(this.apiURL + api, body);
  }

  updateCompany(api: string, body: any): Observable<UpdateCompanyResponse> {
    return this.http.put<UpdateCompanyResponse>(this.apiURL + api, body);
  }

  deleteCompany(api: string, id: number) {
    return this.http.delete(`${this.apiURL}${api}/${id}`);
  }

}
