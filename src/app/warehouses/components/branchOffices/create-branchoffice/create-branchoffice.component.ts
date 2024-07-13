import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../shared/service/validators.service';
import { CompanyService } from '../../../services/company.service';
import { BranchOfficeService } from '../../../services/branch-office.service';
import { tap } from 'rxjs';
import { MessageService } from 'primeng/api';

interface Company {
  id: number;
  name: string;
  address: string;
  email: string;
}

@Component({
  selector: 'create-branchoffice',
  templateUrl: './create-branchoffice.component.html',
  styleUrl: './create-branchoffice.component.css'
})
export class CreateBranchofficeComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    address: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
    state: ['', [Validators.required, Validators.minLength(4)]],
    companyId: [null, [Validators.required]]
  });

  public companies: Company[] | undefined;

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private companyService: CompanyService,
    private branchOfficeService: BranchOfficeService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  private loadCompanies(): void {
    if (this.companyService.companiesSaved.length > 0) {
      this.companies = this.companyService.companiesSaved;
    } else {
      this.companyService.getCompanies('/getAll').subscribe(resp => {
        this.companies = this.companyService.companiesSaved;
      });
    }
  }

  isNotValidField( field: string ) {
    return this.validatorsService.isNotValidField(this.myForm, field);
  }

  getFieldError( field: string ) {
    return this.validatorsService.getMessageError(this.myForm, field);
  }

  saveBranchOffice() {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    const body = {
      name: this.myForm.value.name,
      address: this.myForm.value.address,
      email: this.myForm.value.email,
      state: this.myForm.value.state,
      companyId: this.myForm.value.companyId.id
    }

    this.branchOfficeService.createBranchOffice('/create', body).pipe(
      tap({
        next: (resp) => {
          console.log(resp);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Branchoffice created successfully' });
          this.myForm.reset({
            name: '',
            address: '',
            email: '',
            state: '',
            companyId: undefined
          });
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Branchoffice creation failed' });
        }
      })
    ).subscribe();

  }

}
