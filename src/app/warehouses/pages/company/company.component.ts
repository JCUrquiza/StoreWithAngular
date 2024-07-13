import { Component } from '@angular/core';
import { WarehousesService } from '../../services/warehouses.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {

  public actionOfCrudFromService = {
    create: false,
    read: false,
  };

  constructor(
    private warehousesService: WarehousesService
  ) {}

  selectAction(action: string) {
    this.actionOfCrudFromService = this.warehousesService.showActionOFCrud(action);
  }

}


