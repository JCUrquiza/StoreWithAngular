import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { CompanyService } from '../../../services/company.service';
import { ValidatorsService } from '../../../../../../shared/service/validators.service';


@Component({
  selector: 'create-company',
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.css',
  providers: [MessageService]
})
export class CreateCompanyComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(5), Validators.pattern(this.validatorsService.alphaNumericWithSignsPattern)
    ]],
    email: ['', [
      Validators.required,
      Validators.pattern(this.validatorsService.emailPattern)
    ]],
    address: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(this.validatorsService.alphaNumericWithSignsPattern)
    ]]
  });

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private validatorsService: ValidatorsService,
    private messageService: MessageService,
  ) {}

  isNotValidField( field: string ): boolean | null {
    return this.validatorsService.isNotValidField(this.myForm, field);
  }

  getFieldError( field: string ): string | null {
    return this.validatorsService.getMessageError(this.myForm, field);
  }

  saveCompany() {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    };

    const body = {
      name: this.myForm .value.name,
      email: this.myForm.value.email,
      address: this.myForm.value.address
    };
    this.companyService.createCompany('/create', body).pipe(
      tap({
        next: (resp) => {
          console.log(resp);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Company created successfully' });
          this.myForm.reset({
            name: '',
            email: '',
            address: ''
          });
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Company creation failed' });
        }
      })
    ).subscribe();

    this.myForm.reset({
      name: '',
      email: '',
      address: ''
    });

  }

  // TODO: Crear spinner para evitar doble click(personalizar botón)

}
