import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrl: './list-customer.component.css'
})
export class ListCustomerComponent implements OnInit {

  public customers: Customer[] = [];

  constructor(
    private customerService: CustomerService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  public loadCustomers(): void {
    this.customerService.getAllCustomers('/getAll/customers')
      .subscribe( resp => {
        this.customers = resp.customers;
        console.log(this.customers);
      });
  }

  public getSeverity(statusCode: string): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined {
    switch(statusCode) {
      case 'penrev':
        return 'info';
      case 'Preaut':
        return 'danger';
      case 'Autori':
        return 'success';
      default:
        return undefined;
    }
  }

  public goDetailsCustomer(id: string): void {
    localStorage.setItem('customerId', id);
    this.router.navigate(['dashboard/customers/details']);
  }

}
