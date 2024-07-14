import { Component } from '@angular/core';
import { WarehousesService } from '../../services/warehouses.service';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrl: './warehouses.component.css'
})
export class WarehousesComponent {

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
