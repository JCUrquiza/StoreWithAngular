import { Component } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {

  public componentState = {
    create: false,
    read: false,
    update: false,
    delete: false
  };

  constructor() {}

  selectAction(action: string) {

    this.componentState.create = false;
    this.componentState.read = false;
    this.componentState.update = false;
    this.componentState.delete = false;

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
      case 'delete':
        this.componentState.delete = true;
        break;
      default:
        break;
    }

  }

}
