import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";


@Injectable({ providedIn: 'root' })
export class ValidatorsService {

  public firstNameAndLastnamePattern: string = '^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+ ?[a-zA-ZáéíóúÁÉÍÓÚñÑ]+ ?$';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public alphaNumericWithSignsPattern: string = '^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ,.\\s]+$';
  public numericPattern: string = '^[0-9]+$';

  public isNotValidField ( form: FormGroup, field: string ) {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public getMessageError( form: FormGroup, field: string ): string | null {
    if ( !form.controls[field] ) return null;

    const errors = form.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracteres.`;
        case 'pattern':
          return this.getPatternErrorMessage(field);
      }
    }

    return null;
  }

  private getPatternErrorMessage(field: string): string {
    const patternMessages: { [key: string]: string } = {
      name: 'Solo se permiten letras, números, acentos, comas, puntos y espacios.',
      email: 'Email no válido',
      address: 'Solo se permiten letras, números, acentos, comas, puntos y espacios.',
    };

    return patternMessages[field] || 'Formato no válido';
  }

}
