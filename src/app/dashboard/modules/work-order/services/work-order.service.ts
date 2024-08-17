import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environments';
import { WorkOrderResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {

  private baseUrl: string = `${ environment.baseUrl }/api/v1/workOrder`;

  constructor(
    public http: HttpClient
  ) {}

  public create(url: string, body: any) {
    return this.http.post(this.baseUrl + url, body);
  }

  public getAll(url: string): Observable<WorkOrderResponse> {
    return this.http.get<WorkOrderResponse>(this.baseUrl + url);
  }

}



