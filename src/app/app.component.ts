import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private authService = inject( AuthService );
  private router = inject( Router );

  constructor( private primengConfig: PrimeNGConfig ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  public finishedAuthCheck = computed<boolean>( () => {
    if ( this.authService.authStatus() === AuthStatus.checking ) {
      return false;
    };
    return true;
  });


  public authStatusChangedEffect = effect(() => {

    console.log(this.authService.authStatus());

    switch ( this.authService.authStatus() ) {
      case AuthStatus.checking:
        return;
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
        return;
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return;
    }

  });


}
