import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { BranchOffice, TypeCustomer } from '../../interfaces';
import { ValidatorsService } from '../../../../../shared/service/validators.service';
import { tap } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css'
})
export class CreateCustomerComponent implements OnInit {

  public typeCustomer: TypeCustomer[] = [];
  public branchOffices: BranchOffice[] = [];

  public myForm: FormGroup = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)
    ]],
    sureName: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)
    ]],
    secondSureName: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)
    ]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
    address: ['', [Validators.required, Validators.pattern(this.validatorsService.alphaNumericWithSignsPattern)]],
    telephone: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(this.validatorsService.numericPattern)]],
    typeCustomerId: [null, [Validators.required]],
    branchOfficeId: [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private validatorsService: ValidatorsService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.loadTypeCustomer();
    this.loadBranchOffices();
  }

  public loadTypeCustomer(): void {
    this.customerService.getTypeCustomers('/getAll/type-customer')
      .subscribe( resp => {
        this.typeCustomer = resp.typeCustomers;
        console.log(this.typeCustomer);
      })
  }

  public loadBranchOffices(): void {
    this.customerService.getBranchOffices('/getAll')
      .subscribe( resp => {
        this.branchOffices = resp.branchesOffices;
        console.log(this.branchOffices);
      });
  }

  isNotValidField( field: string ) {
    return this.validatorsService.isNotValidField(this.myForm, field);
  }

  getFieldError( field: string ) {
    return this.validatorsService.getMessageError(this.myForm, field);
  }


  public send(): void {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    const body = {
      name: this.myForm.value.name,
      apellidoPaterno: this.myForm.value.sureName,
      apellidoMaterno: this.myForm.value.secondSureName,
      email: this.myForm.value.email,
      address: this.myForm.value.address,
      telephone: this.myForm.value.telephone,
      typeCustomerId: this.myForm.value.typeCustomerId.id,
      branchOfficeId: this.myForm.value.branchOfficeId.id
    };
    this.customerService.createCustomer('/create/customer', body).pipe(
      tap({
        next: (resp) => {
          console.log(resp);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer created successfully' });
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Customer creation failed' });
        }
      })
    ).subscribe();

  }

}
