import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsInWarehousesResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsInWarehousesService {

  private apiURL = 'http://localhost:3000/api/v1/productsInWarehouses';

  constructor(
    private http: HttpClient
  ) {}

  public saveProductInWarehouse(url: string, body: any) {
    return this.http.post(this.apiURL + url, body);
  }

  public getProductsByWarehouse(url: string, body: any): Observable<ProductsInWarehousesResponse> {
    return this.http.post<ProductsInWarehousesResponse>(this.apiURL + url, body);
  }

}


