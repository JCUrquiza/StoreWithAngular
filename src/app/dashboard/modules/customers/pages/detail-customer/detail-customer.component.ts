import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../../shared/service/validators.service';
import { BranchOffice, TypeCustomer } from '../../interfaces';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrl: './detail-customer.component.css'
})
export class DetailCustomerComponent implements OnInit {

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
    private customerService: CustomerService,
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
  ) {}

  ngOnInit(): void {
    this.loadCustomerDetail();
    this.loadTypeOfCustomer();
    this.loadBranchOffices();
  }

  public loadCustomerDetail() {
    const customerId = localStorage.getItem('customerId');
    if ( customerId ) {
      this.customerService.getCustomerDetail(`/get/customer/${customerId}`)
        .subscribe( resp => {
          this.myForm.patchValue({
            name: resp.customer.name,
            sureName: resp.customer.sureName,
            secondSureName: resp.customer.secondSureName,
            email: resp.customer.email,
            address: resp.customer.address,
            telephone: resp.customer.telephone,
            typeCustomerId: resp.customer.typeCustomer,
            branchOfficeId: resp.customer.branchOffice,
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
    console.log(this.myForm.value);
  }

}
