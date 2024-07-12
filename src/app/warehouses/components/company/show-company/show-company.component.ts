import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { CompanyService } from '../../../services/company.service';
import { Company } from '../../../interfaces';

@Component({
  selector: 'show-company',
  templateUrl: './show-company.component.html',
  styleUrl: './show-company.component.css'
})
export class ShowCompanyComponent implements OnInit {

  public companies: Company[] = [];

  constructor(
    private companyService: CompanyService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.companyService.getCompanies('/getAll')
      .subscribe( resp => {
        console.log(resp);
        this.companies = resp.company;
    });
  }

  updateCompany( id: number ): void {
    console.log(id);
  }

  confirmDelete(id: number): void {
    this.confirmationService.confirm({
      header: 'Are you sure you want to delete this item?',
      message: 'Please, confirm to proceed with the deletion',
      accept: () => {
        this.deleteCompany(id);
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Cancelar', detail: 'You hace cancelled the action.', life: 3000 });
      }
    });
  }

  deleteCompany(id: number): void {
    this.companyService.deleteCompany('/delete', id).pipe(
      tap({
        next: (resp) => {
          console.log(resp);
          this.messageService.add({ severity: 'info', summary: 'Confirmar', detail: 'Company deleted successfully', life: 3000 });
          this.companies = this.companies.filter(company => company.id !== id);
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error, life: 3000 });
        }
      })
    ).subscribe();
  }

}


