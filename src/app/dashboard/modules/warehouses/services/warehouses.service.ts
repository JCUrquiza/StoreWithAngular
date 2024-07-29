import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company, WarehousesResponse } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarehousesService {

  private baseURL = 'http://localhost:3000/api/v1/warehouse';

  public componentWarehousesState = {
    create: false,
    read: false,
  };

  public companySaved: Company[] = [];

  constructor(
    private http: HttpClient
  ) {}

  showActionOFCrud(action: string) {

    this.componentWarehousesState.create = false;
    this.componentWarehousesState.read = false;

    switch (action) {
      case 'create':
        this.componentWarehousesState.create = true;
        break;
      case 'read':
        this.componentWarehousesState.read = true;
        break;
      default:
        break;
    }

    return this.componentWarehousesState;
  }

  saveCompanyInLocal( company: Company ) {
    this.companySaved.push( company );
  }

  getCompanySavedInLocal() {
    return this.companySaved;
  }

  getWarehouses(url: string): Observable<WarehousesResponse> {
    return this.http.get<WarehousesResponse>(this.baseURL + url);
  }

  createWarehouse(url: string, body: any): Observable<any> {
    return this.http.post(this.baseURL + url, body);
  }


}


