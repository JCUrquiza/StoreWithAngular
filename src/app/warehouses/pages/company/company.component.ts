import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {

  public actionOfCrudFromService = {
    create: false,
    read: false,
  };

  constructor(
    private companyService: CompanyService
  ) {}

  selectAction(action: string) {
    this.actionOfCrudFromService = this.companyService.showActionOFCrudCompany(action);
  }

}


