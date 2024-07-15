import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../shared/service/validators.service';
import { WarehousesService } from '../../../services/warehouses.service';
import { tap } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'create-warehouses',
  templateUrl: './create-warehouses.component.html',
  styleUrl: './create-warehouses.component.css'
})
export class CreateWarehousesComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(this.validatorsService.alphaNumericWithSignsPattern)
    ]]
  });

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private warehousesService: WarehousesService,
    private messageService: MessageService,
  ) {}

  isNotValidField(field: string) {
    return this.validatorsService.isNotValidField(this.myForm, field);
  }

  getFieldError(field: string) {
    return this.validatorsService.getMessageError(this.myForm, field);
  }

  sendForm() {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    const body = {
      name: this.myForm.value.name
    }
    this.warehousesService.createWarehouse('/create', body).pipe(
      tap({
        next: (resp) => {
          console.log(resp);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Warehouse created successfully' });
          this.myForm.reset({
            name: '',
          });
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error });
        }
      })
    ).subscribe();

  }

}
