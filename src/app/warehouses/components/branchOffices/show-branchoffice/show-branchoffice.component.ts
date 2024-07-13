import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BranchOfficeService } from '../../../services/branch-office.service';
import { BranchesOffice } from '../../../interfaces';
import { tap } from 'rxjs';


@Component({
  selector: 'show-branchoffice',
  templateUrl: './show-branchoffice.component.html',
  styleUrl: './show-branchoffice.component.css'
})
export class ShowBranchofficeComponent implements OnInit {

  public branchesOffices: BranchesOffice[] = [];

  constructor(
    private messageService: MessageService,
    private branchOfficeService: BranchOfficeService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.showAllBranchOffices();
  }

  showAllBranchOffices() {
    this.branchOfficeService.getAll('/getAll')
      .subscribe( resp => {
        console.log(resp);
        this.branchesOffices = resp.branchesOffices;
        console.log( this.branchesOffices );
      });
  }




  confirmDelete(id: number): void {
    this.confirmationService.confirm({
      header: 'Are you sure you want to delete this item?',
      message: 'Please, confirm to proceed with the deletion',
      accept: () => {
        this.deleteBranchOffice(id);
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Cancelar', detail: 'You have cancelled the action.', life: 3000 });
      }
    });
  }

  deleteBranchOffice(id: number) {
    this.branchOfficeService.deleteBranchOffice('/delete', id).pipe(
      tap({
        next: (resp) => {
          console.log(resp);
          this.messageService.add({ severity: 'info', summary: 'Confirmar', detail: 'Branch Office deleted successfully', life: 3000 });
          this.branchesOffices = this.branchesOffices.filter( branchOffice => branchOffice.id !== id);
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error, life: 3000 });
        }
      })
    ).subscribe();

  }

}
