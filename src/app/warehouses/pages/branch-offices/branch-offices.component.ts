import { Component } from '@angular/core';
import { BranchOfficeService } from '../../services/branch-office.service';

@Component({
  selector: 'app-branch-offices',
  templateUrl: './branch-offices.component.html',
  styleUrl: './branch-offices.component.css'
})
export class BranchOfficesComponent {

  public actionOfCrudFromService = {
    create: false,
    read: false,
  };

  constructor(
    private branchOfficeService: BranchOfficeService,
  ) {}

  selectAction(action: string) {
    this.actionOfCrudFromService = this.branchOfficeService.showActionOfCrud(action);
  }

}
