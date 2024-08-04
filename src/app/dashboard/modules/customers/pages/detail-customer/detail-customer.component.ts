import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrl: './detail-customer.component.css'
})
export class DetailCustomerComponent implements OnInit {

  constructor(
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.loadCustomerDetail();
  }

  public loadCustomerDetail() {
    const customerId = localStorage.getItem('customerId');
    this.customerService.getCustomerDetail(`/get/customer/${customerId}`)
      .subscribe( resp => {
        console.log(resp);
      })
  }

}
