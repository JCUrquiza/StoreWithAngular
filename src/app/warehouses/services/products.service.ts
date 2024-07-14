import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductFamilyResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseURL = 'http://localhost:3000/api/v1/productFamily';

  public componentProductState = {
    create: false,
    read: false,
  };

  constructor(
    private http: HttpClient
  ) {}

  showActionOFCrudProducts(action: string) {

    this.componentProductState.create = false;
    this.componentProductState.read = false;

    switch (action) {
      case 'create':
        this.componentProductState.create = true;
        break;
      case 'read':
        this.componentProductState.read = true;
        break;
      default:
        break;
    }

    return this.componentProductState;
  }


  getAllProductFamilies(url: string): Observable<ProductFamilyResponse> {
    return this.http.get<ProductFamilyResponse>(this.baseURL + url);
  }


  createProductFamily(url: string, body: any): Observable<any> {
    return this.http.post(this.baseURL + url, body);
  }

}
