import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  public actionOfCrudFromService = {
    create: false,
    read: false,
  };

  constructor(
    private productsService: ProductsService
  ) {}

  selectAction(action: string) {
    this.actionOfCrudFromService = this.productsService.showActionOFCrudProducts(action);
  }

}
