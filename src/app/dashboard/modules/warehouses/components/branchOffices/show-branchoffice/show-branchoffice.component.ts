import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { BranchOfficeService } from '../../../services/branch-office.service';
import { BranchesOffice } from '../../../interfaces';
import { ValidatorsService } from '../../../../../../shared/service/validators.service';


@Component({
  selector: 'show-branchoffice',
  templateUrl: './show-branchoffice.component.html',
  styleUrl: './show-branchoffice.component.css'
})
export class ShowBranchofficeComponent implements OnInit {

  // TODO: Editar también la empresa

  public branchesOffices: BranchesOffice[] = [];
  public showDialogToUpdateBranchOffice: boolean = false;

  public editForm: FormGroup;
  private selectedBranchOfficeId: number | null = null;

  constructor(
    private messageService: MessageService,
    private branchOfficeService: BranchOfficeService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {
    this.editForm = this.fb.group({
      idCompany: [null],
      idBranch: [null],
      name: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(this.validatorsService.alphaNumericWithSignsPattern)
      ]],
      address: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(this.validatorsService.alphaNumericWithSignsPattern)
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern(this.validatorsService.emailPattern)
      ]],
      state: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(this.validatorsService.alphaNumericWithSignsPattern)
      ]]
    });
  }

  ngOnInit(): void {
    this.loadBranchOffices();
  }

  loadBranchOffices() {
    this.branchOfficeService.getAll('/getAll')
      .subscribe( resp => {
        console.log(resp);
        this.branchesOffices = resp.branchesOffices;
        console.log( this.branchesOffices );
      });
  }

  openEditDialog(branchOffice: any): void {

    this.selectedBranchOfficeId = branchOffice.id;
    this.editForm.patchValue({
      idCompany: branchOffice.company.id,
      idBranch: branchOffice.id,
      name: branchOffice.name,
      address: branchOffice.address,
      email: branchOffice.email,
      state: branchOffice.state
    });
    this.showDialogToUpdateBranchOffice = true;
  }

  isNotValidField( field: string ): boolean | null {
    return this.validatorsService.isNotValidField( this.editForm, field );
  }

  getFieldError( field: string ): string | null {
    return this.validatorsService.getMessageError( this.editForm, field );
  }

  saveBranchOffice(): void {

    if ( this.editForm.invalid ) {
      this.editForm.markAllAsTouched();
      return;
    };

    const branchOfficeId = this.editForm.value.idBranch;
    const body = {
      name: this.editForm.value.name,
      email: this.editForm.value.email,
      address: this.editForm.value.address,
      state: this.editForm.value.state,
      companyId: this.editForm.value.idCompany
    }
    this.branchOfficeService.updateBranchoffice('/update', branchOfficeId, body).pipe(
      tap({
        next: (resp) => {
          console.log(resp);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Branch updated successfully' });
          this.loadBranchOffices();
          this.editForm.reset({
            name: '',
            email: '',
            address: ''
          });
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error });
        }
      })
    ).subscribe();

    this.showDialogToUpdateBranchOffice = false;
  }


  confirmDelete(id: number): void {
    this.confirmationService.confirm({
      header: 'Are you sure you want to delete this item?',
      message: 'Please, confirm to proceed with the deletion',
      accept: () => {
        this.deleteBranchOffice(id);
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Cancelar', detail: 'You have cancelled the action.', life: 3000 });
      }
    });
  }

  deleteBranchOffice(id: number) {
    this.branchOfficeService.deleteBranchOffice('/delete', id).pipe(
      tap({
        next: (resp) => {
          console.log(resp);
          this.messageService.add({ severity: 'info', summary: 'Confirmar', detail: 'Branch Office deleted successfully', life: 3000 });
          this.branchesOffices = this.branchesOffices.filter( branchOffice => branchOffice.id !== id);
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error, life: 3000 });
        }
      })
    ).subscribe();

  }

  updateBranchOffice() {
    this.showDialogToUpdateBranchOffice = true;
  }

}


