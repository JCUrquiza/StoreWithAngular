import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BranchOfficeService } from '../../../services/branch-office.service';
import { BranchesOffice } from '../../../interfaces';


@Component({
  selector: 'show-branchoffice',
  templateUrl: './show-branchoffice.component.html',
  styleUrl: './show-branchoffice.component.css'
})
export class ShowBranchofficeComponent implements OnInit {

  public branchesOffices: BranchesOffice[] = [];

  constructor(
    private messageService: MessageService,
    private branchOfficeService: BranchOfficeService,
  ) {}

  ngOnInit(): void {
    this.showAllBranchOffices();
  }

  showAllBranchOffices() {
    this.branchOfficeService.getAll('/getAll')
      .subscribe( resp => {
        console.log(resp);
        this.branchesOffices = resp.branchesOffices;
        console.log( this.branchesOffices );
      });
  }

}
