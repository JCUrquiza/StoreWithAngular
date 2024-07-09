import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../services/company.service';
import { Company } from '../../../interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'show-company',
  templateUrl: './show-company.component.html',
  styleUrl: './show-company.component.css'
})
export class ShowCompanyComponent implements OnInit {

  company: Company = {
    id: 0,
    name: '',
    email: '',
    address: ''
  }

  public companyForm: FormGroup;

  constructor(
    private companyService: CompanyService,
    private fb: FormBuilder,
  ) {
    this.companyForm = this.fb.group({
      name: [''],
      email: [''],
      address: [''],
    });
  }

  ngOnInit(): void {
    this.companyService.getCompanies('/getAll')
      .subscribe( resp => {
        console.log(resp);
        const company = resp.company[0];
        this.companyForm.patchValue(company);
    })
  }

}
