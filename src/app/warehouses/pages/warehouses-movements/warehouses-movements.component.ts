import { Component } from '@angular/core';
import { ProductsInWarehousesService } from '../../services/products-in-warehouses.service';

@Component({
  selector: 'app-warehouses-movements',
  templateUrl: './warehouses-movements.component.html',
  styleUrl: './warehouses-movements.component.css'
})
export class WarehousesMovementsComponent {

  public actionOfCrudFromService = {
    create: false,
    read: false,
  };

  constructor(
    private productsInWarehousesService: ProductsInWarehousesService
  ) {}

  selectAction(action: string) {
    this.actionOfCrudFromService = this.productsInWarehousesService.showActionOFTransferType(action);
  }

}
