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
  };

  constructor() {}

  selectAction(action: string) {

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

  }

}
