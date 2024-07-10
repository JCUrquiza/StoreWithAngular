import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../../services/company.service';
import { ValidatorsService } from '../../../../shared/service/validators.service';

@Component({
  selector: 'create-company',
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.css'
})
export class CreateCompanyComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(5) ]],
    email: ['', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern) ]],
    address: ['', [ Validators.required ]]
  });

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private validatorsService: ValidatorsService,
  ) {}

  isNotValidField( field: string ): boolean | null {
    return this.validatorsService.isNotValidField(this.myForm, field);
  }

  getFieldError( field: string ): string | null {

    if ( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      console.log(key);
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracteres.`;
        case 'pattern':
          return 'Email no válido'
      }
    }

    return null;
  }

  saveCompany() {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    };

    const body = {
      name: this.myForm .value.name,
      email: this.myForm.value.email,
      address: this.myForm.value.address
    };
    this.companyService.createCompany('/create', body)
      .subscribe( resp => {
        console.log(resp);
        // const company = {
        //   name: '',
        //   email: '',
        //   address: ''
        // }
        // Usando en NgOnInit:
        // this.myForm.reset( company );
      });

    this.myForm.reset({
      name: '',
      email: '',
      address: ''
    });

  }

  // TODO: Crear spinner para evitar doble click(personalizar botón)
  // TODO: Mandar mensaje de creado correctamente
  // TODO: Validación de formulario

}
