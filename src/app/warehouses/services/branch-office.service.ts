import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BranchOfficeService {

  public componentBranchOfficeState = {
    create: false,
    read: false,
  }

  constructor() { }

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

}
