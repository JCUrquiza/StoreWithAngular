import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrl: './list-customer.component.css'
})
export class ListCustomerComponent implements OnInit {

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
      });
  }

}
