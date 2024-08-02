import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../interfaces';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrl: './list-customer.component.css'
})
export class ListCustomerComponent implements OnInit {

  public customers: Customer[] = [];

  constructor(
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  public loadCustomers(): void {
    this.customerService.getAllCustomers('/getAll/customers')
      .subscribe( resp => {
        console.log(resp);
        this.customers = resp.customers;
      });
  }

  public getSeverity(statusCode: string): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined {
    switch(statusCode) {
      case 'penrev':
        return 'info';
      case 'Atendo':
        return 'danger';
      case 'Reslto':
        return 'success';
      default:
        return undefined;
    }
  }

}
