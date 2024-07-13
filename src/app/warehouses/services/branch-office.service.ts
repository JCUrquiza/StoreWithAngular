import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BranchOfficeResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class BranchOfficeService {

  private apiURL = 'http://localhost:3000/api/v1/branchesOffices';

  public componentBranchOfficeState = {
    create: false,
    read: false,
  }

  constructor(
    private http: HttpClient
  ) { }

  showActionOfCrud(action: string) {

    this.componentBranchOfficeState.create = false;
    this.componentBranchOfficeState.read = false;

    switch (action) {
      case 'create':
        this.componentBranchOfficeState.create = true;
        break;
      case 'read':
        this.componentBranchOfficeState.read = true;
        break;
      default:
        break;
    }

    return this.componentBranchOfficeState;
  }


  createBranchOffice(url: string, body: any) {
    return this.http.post( this.apiURL + url, body );
  }

  getAll(url: string): Observable<BranchOfficeResponse> {
    return this.http.get<BranchOfficeResponse>( this.apiURL + url );
  }

  updateBranchoffice(url: string, id: number, body: any) {
    return this.http.put(`${this.apiURL}${url}/${id}`, body);
  }

  deleteBranchOffice(url: string, id: number) {
    return this.http.delete(`${this.apiURL}${url}/${id}`);
  }

}
