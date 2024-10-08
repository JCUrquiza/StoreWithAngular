import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );

  public infoUser = {};

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem('token', token);

    // Decodificar Token:
    this.decodifyAndSaveToken(token);

    return true;
  }

  decodifyAndSaveToken(token: string) {
    // Decodify token from jwt:
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g,'+').replace(/_/g,'/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    // from string to json:
    const tokenToJson = JSON.parse(jsonPayload);
    // And save token:
    this.infoUser = tokenToJson;
  }

  login( email:string, password: string ): Observable<boolean> {
    const url = `${this.baseUrl}/api/v1/auth/login`;
    const body = {
      email: email,
      password: password
    };

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        delay(3000),
        map( ({ user, token }) => this.setAuthentication(user, token) ),
        catchError( err => throwError( () => err.error.error ))
      );
  }


  checkAuthStatus(): Observable<boolean> {

    const url = `${this.baseUrl}/api/v1/auth/validate-token`;
    const token = localStorage.getItem('token');
    if ( !token ) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenResponse>(url, {headers})
      .pipe(
        map( ({ user, token }) => this.setAuthentication(user, token) ),
        catchError(() => {
          this._authStatus.set( AuthStatus.notAuthenticated );
          return of(false)
        })
      )

  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set( null );
    this._authStatus.set( AuthStatus.notAuthenticated );
  }


}




