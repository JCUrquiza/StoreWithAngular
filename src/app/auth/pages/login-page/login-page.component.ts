import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ValidatorsService } from '../../../shared/service/validators.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private fb = inject( FormBuilder );
  private authService = inject( AuthService );
  private router = inject( Router );
  private validatorsService = inject( ValidatorsService );

  public loadUserLogin: boolean = false;

  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  isNotValidField( field: string ) {
    return this.validatorsService.isNotValidField(this.myForm, field);
  }

  getFieldError( field: string ) {
    return this.validatorsService.getMessageError(this.myForm, field);
  }

  public login() {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.loadUserLogin = true;

    const { email, password } = this.myForm.value;
    this.authService.login(email, password)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/dashboard/tickets'),
          this.loadUserLogin = false;
        },
        error: (error) => {
          console.log({ loginPage: error });
          this.loadUserLogin = false;
        }
      })
  }

}
