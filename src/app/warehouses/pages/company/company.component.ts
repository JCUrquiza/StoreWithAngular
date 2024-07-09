import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent implements OnInit {

  public componentCreate: boolean = false;
  public componentRead: boolean = false;
  public componentUpdate: boolean = false;
  public componentDelete: boolean = false;

  constructor( private companyService: CompanyService ) {}

  ngOnInit(): void {
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.companyService.getCompanies('/getAll')
      .subscribe( res => console.log(res)
    );
  }

  selectAction(action: string) {

    switch (action) {
      case 'create':
        this.componentCreate = true;
        this.componentRead = false;
        this.componentUpdate = false;
        this.componentDelete = false
        break;

      case 'read':
        this.componentCreate = false;
        this.componentRead = true;
        this.componentUpdate = false;
        this.componentDelete = false;
        break;

      case 'update':
        this.componentCreate = false;
        this.componentRead = false;
        this.componentUpdate = true;
        this.componentDelete = false;
        break;

      case 'delete':
        this.componentCreate = false;
        this.componentRead = false;
        this.componentUpdate = false;
        this.componentDelete = true;
        break;

      default:
        break;
    }

  }

}
