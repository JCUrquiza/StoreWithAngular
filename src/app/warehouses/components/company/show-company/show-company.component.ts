import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'show-company',
  templateUrl: './show-company.component.html',
  styleUrl: './show-company.component.css'
})
export class ShowCompanyComponent implements OnInit {

  constructor(
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.companyService.getCompanies('/getAll')
      .subscribe( resp => console.log(resp )
    )
  }

}
