import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators'; // Importa 'tap'
import { Personlogin, PersonResponseLogin } from 'src/app/model/personLogin.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = new BehaviorSubject<boolean>(false);
  private _id: string | null = null;
  private baseURL = sessionStorage.getItem('baseUrl');

  constructor(private http: HttpClient) {
    this._auth.next(!!sessionStorage.getItem('auth'));
    this._id = sessionStorage.getItem('personId');
  }

  get id(): string | null {
    return this._id;
  }

  set id(value: string | null) {
    this._id = value;
  }

  get isAuthenticated(): Observable<boolean> {
    return this._auth.asObservable();
  }

  verifyCredentials(credenciales: Personlogin): Observable<PersonResponseLogin> {
    return this.http.post<PersonResponseLogin>(`${this.baseURL}/login`, credenciales).pipe(
      tap((response: PersonResponseLogin) => { // Especifica el tipo para 'response'
        if (response.success) {
          this.login(response);
        } else {
          this.logout();
        }
      })
    );
  }

  login(response: PersonResponseLogin): void {
    if (response.success) {
      this._auth.next(true);
      this._id = response.value.id;
      sessionStorage.setItem('auth', 'true');
      sessionStorage.setItem('personId', this._id);
      sessionStorage.setItem('isAdmin', response.value.isAdmin.toString());
    }
  }

  logout(): void {
    this._auth.next(false);
    this._id = null;
    sessionStorage.removeItem('auth');
    sessionStorage.removeItem('personId');
    sessionStorage.removeItem('isAdmin');
  }
}
