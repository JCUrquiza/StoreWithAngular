import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsInWarehousesResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsInWarehousesService {

  private apiURL = 'http://localhost:3000/api/v1/productsInWarehouses';

  public componentCompanyState = {
    create: false,
    read: false,
  };

  constructor(
    private http: HttpClient
  ) {}


  showActionOFTransferType(action: string) {

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

  public saveProductInWarehouse(url: string, body: any) {
    return this.http.post(this.apiURL + url, body);
  }

  public getProductsByWarehouse(url: string, body: any): Observable<ProductsInWarehousesResponse> {
    return this.http.post<ProductsInWarehousesResponse>(this.apiURL + url, body);
  }

  public updateQuantityOfProduct(url: string, id: number, body: any) {
    return this.http.put(this.apiURL + url + '/' + id, body);
  }

}


