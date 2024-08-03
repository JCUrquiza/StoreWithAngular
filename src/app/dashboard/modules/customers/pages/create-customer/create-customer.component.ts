import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { BranchOffice, TypeCustomer } from '../../interfaces';
import { ValidatorsService } from '../../../../../shared/service/validators.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css'
})
export class CreateCustomerComponent implements OnInit {

  public typeCustomer: TypeCustomer[] = [];
  public branchOffices: BranchOffice[] = [];

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    sureName: ['', [Validators.required]],
    secondSureName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    address: ['', [Validators.required]],
    typeCustomerId: [null, [Validators.required]],
    branchOfficeId: [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private validatorsService: ValidatorsService,
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

    console.log(this.myForm.value);
  }

}
