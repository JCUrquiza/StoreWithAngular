import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../../shared/service/validators.service';
import { BranchOffice, TypeCustomer } from '../../interfaces';
import { tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrl: './detail-customer.component.css'
})
export class DetailCustomerComponent implements OnInit {

  public typeCustomer: TypeCustomer[] = [];
  public branchOffices: BranchOffice[] = [];
  public customerId: string ='';

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
    private customerService: CustomerService,
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.customerId = localStorage.getItem('customerId')!;
    this.loadCustomerDetail();
    this.loadTypeOfCustomer();
    this.loadBranchOffices();
  }

  public loadCustomerDetail() {
    if ( this.customerId ) {
      this.customerService.getCustomerDetail(`/get/customer/${this.customerId}`)
        .subscribe( resp => {
          this.myForm.patchValue({
            name: resp.customer.name,
            sureName: resp.customer.sureName,
            secondSureName: resp.customer.secondSureName,
            email: resp.customer.email,
            address: resp.customer.address,
            telephone: resp.customer.telephone,
            typeCustomerId: resp.customer.typeCustomer
          });
      });
    }
  }

  public loadTypeOfCustomer() {
    this.customerService.getTypeCustomers('/getAll/type-customer')
      .subscribe( resp => {
        this.typeCustomer = resp.typeCustomers;
      });
  }

  public loadBranchOffices() {
    this.customerService.getBranchOffices('/getAll')
      .subscribe( resp => {
        this.branchOffices = resp.branchesOffices;
      });
  }

  isNotValidField( field: string ) {
    return this.validatorsService.isNotValidField(this.myForm, field);
  }

  getFieldError( field: string ) {
    return this.validatorsService.getMessageError(this.myForm, field);
  }

  public send() {
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
    }
    this.customerService.updateCustomer(`/update/customer/${this.customerId}`, body).pipe(
      tap({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer updated successfully' });
          this.router.navigate(['dashboard/customers/list']);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Customer updated failed' });
        }
      })
    ).subscribe();

  }

  public updateStatus(statusId: number): void {
    const body = {
      statusId: statusId,
      customerId: this.customerId
    }
    this.customerService.updateStatusCustomer('/update/status/customer', body).pipe(
      tap({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer updated successfully' });
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Customer updated failed' });
        }
      })
    ).subscribe();
  }

}
