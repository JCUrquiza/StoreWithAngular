import { Component, inject, OnInit } from '@angular/core';
import { WorkOrderService } from '../../services/work-order.service';
import { WorkOrder } from '../../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-work-order',
  templateUrl: './list-work-order.component.html',
  styleUrl: './list-work-order.component.css'
})
export class ListWorkOrderComponent implements OnInit {

  public workOrdersList: WorkOrder[] = [];

  public workOrderService = inject(WorkOrderService);
  public router = inject(Router);

  ngOnInit(): void {
    this.loadWorkOrders();
  }

  public loadWorkOrders(): void {
    this.workOrderService.getAll('/getAll')
      .subscribe( resp => {
        this.workOrdersList = resp.workOrder;
        console.log(this.workOrdersList);
      })
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

  public goToDetails(id: string) {
    this.router.navigateByUrl('/dashboard/workOrder/details');
    this.workOrderService.saveId(+id);
  }

}
