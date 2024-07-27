import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private fb = inject( FormBuilder );
  private authService = inject( AuthService );

  public myForm: FormGroup = this.fb.group({
    email: [''],
    password: ['']
  });

  public login() {
    const { email, password } = this.myForm.value;

    this.authService.login(email, password)
      .subscribe( success => {
        console.log(success);
      })

  }

}
