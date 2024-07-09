import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent implements OnInit {

  constructor( private companyService: CompanyService ) {}

  ngOnInit(): void {
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.companyService.getCompanies('/getAll')
      .subscribe( res => console.log(res)
    );
  }

}
