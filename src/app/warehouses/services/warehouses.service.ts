import { Injectable } from '@angular/core';
import { Company } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class WarehousesService {

  public componentState = {
    create: false,
    read: false,
    update: false,
  };

  public companySaved: Company[] = [];

  constructor() {}

  showActionOFCrud(action: string) {

    this.componentState.create = false;
    this.componentState.read = false;
    this.componentState.update = false;

    switch (action) {
      case 'create':
        this.componentState.create = true;
        break;
      case 'read':
        this.componentState.read = true;
        break;
      case 'update':
        this.componentState.update = true;
        break;
      default:
        break;
    }

    return this.componentState;
  }

  saveCompanyInLocal( company: Company ) {
    this.companySaved.push( company );
  }

  getCompanySavedInLocal() {
    return this.companySaved;
  }

}


