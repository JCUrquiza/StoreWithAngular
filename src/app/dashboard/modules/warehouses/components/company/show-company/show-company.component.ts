import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { CompanyService } from '../../../services/company.service';
import { Company } from '../../../interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../../../shared/service/validators.service';


@Component({
  selector: 'show-company',
  templateUrl: './show-company.component.html',
  styleUrl: './show-company.component.css'
})
export class ShowCompanyComponent implements OnInit {

  public companies: Company[] = [];

  public companyForms: FormGroup[] = [];

  constructor(
    private companyService: CompanyService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {}

  ngOnInit(): void {
    this.companyService.getCompanies('/getAll')
      .subscribe( resp => {
        this.companies = resp.company;
        this.initializeForms();
    });
  }

  initializeForms(): void {
    this.companyForms = this.companies.map(company => this.fb.group({
      id: [company.id],
      name: [company.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(this.validatorsService.alphaNumericWithSignsPattern)
      ]],
      email: [company.email, [
        Validators.required,
        Validators.pattern(this.validatorsService.emailPattern)
      ]],
      address: [company.address, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(this.validatorsService.alphaNumericWithSignsPattern)
      ]]
    }));
  }

  isNotValidField( field: string, index: number ) {
    return this.validatorsService.isNotValidField( this.companyForms[index], field );
  }

  getFieldError( field: string, index: number ): string | null {
    return this.validatorsService.getMessageError( this.companyForms[index], field );
  }


  updateCompany( id: number ): void {

    const companyIndex = this.companies.findIndex( company => company.id == id );

    if ( companyIndex !== -1 ) {

      const companyForm = this.companyForms[companyIndex];

      if ( companyForm.invalid ) {
        companyForm.markAllAsTouched();
        return;
      };

      const formValues = companyForm.value;

      const body = {
        name: formValues.name,
        email: formValues.email,
        address: formValues.address
      }

      this.companyService.updateCompany(`/update/${id}`, body).pipe(
        tap({
          next: (resp) => {
            console.log(resp);
            this.messageService.add({ severity: 'info', summary: 'Confirmar', detail: 'Company updated successfully', life: 3000 });
          },
          error: (error) => {
            console.log(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error, life: 3000 });
          }
        })
      ).subscribe();

    }

  }

  confirmDelete(id: number): void {
    this.confirmationService.confirm({
      header: 'Are you sure you want to delete this item?',
      message: 'Please, confirm to proceed with the deletion',
      accept: () => {
        this.deleteCompany(id);
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Cancelar', detail: 'You have cancelled the action.', life: 3000 });
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

  onSubmit(formValue: any): void {
    console.log('Form submitted:', formValue);
  }

}


