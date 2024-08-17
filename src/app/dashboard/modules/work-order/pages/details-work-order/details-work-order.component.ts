import { Component, inject, OnInit } from '@angular/core';
import { WorkOrderService } from '../../services/work-order.service';

@Component({
  selector: 'app-details-work-order',
  templateUrl: './details-work-order.component.html',
  styleUrl: './details-work-order.component.css'
})
export class DetailsWorkOrderComponent implements OnInit {

  public workOrderService = inject(WorkOrderService);

  ngOnInit(): void {
    console.log(this.workOrderService.getId());
  }

}
