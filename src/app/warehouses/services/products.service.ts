import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductFamilyResponse, ProductResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseURLProductFamily = 'http://localhost:3000/api/v1/productFamily';
  private baseURLProduct = 'http://localhost:3000/api/v1/product';

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
    return this.http.get<ProductFamilyResponse>(this.baseURLProductFamily + url);
  }


  createProductFamily(url: string, body: any): Observable<any> {
    return this.http.post(this.baseURLProductFamily + url, body);
  }


  createProduct(url: string, body: any): Observable<any> {
    return this.http.post(this.baseURLProduct + url, body);
  }

  getAllProducts(url: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.baseURLProduct + url);
  }

  updateProduct(url: string, id: number, body: any) {
    return this.http.put(this.baseURLProduct + url + '/' + id, body);
  }

  deleteProduct(url: string, id: number) {
    return this.http.delete(this.baseURLProduct + url + '/' + id);
  }



}

