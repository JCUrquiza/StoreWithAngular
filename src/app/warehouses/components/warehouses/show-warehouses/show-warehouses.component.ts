import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../interfaces';

@Component({
  selector: 'show-warehouses',
  templateUrl: './show-warehouses.component.html',
  styleUrl: './show-warehouses.component.css'
})
export class ShowWarehousesComponent implements OnInit {

  public products: Product[] = [];

  constructor(
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  public loadProducts() {
    this.productsService.getAllProducts('/getAll')
      .subscribe( resp => {
        console.log(resp);
        this.products = resp.allProducts;
      });
  }

}
