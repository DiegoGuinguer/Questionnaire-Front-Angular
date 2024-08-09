import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personlogin, PersonResponseLogin } from 'src/app/model/personLogin.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth: boolean = false;
  private _Id: string | null = null;
  private baseURL = sessionStorage.getItem('baseUrl');

  constructor(private http: HttpClient) {}

  get Id(): string | null {
    return this._Id;
  }

  set Id(value: string | null) {
    this._Id = value;
  }

  get auth(): boolean {
    return this._auth;
  }

  set auth(value: boolean) {
    this._auth = value;
  }

  verifyCredentials(
    credenciales: Personlogin
  ): Observable<PersonResponseLogin> {
    return this.http.post<PersonResponseLogin>(`${this.baseURL}/login`, credenciales);
  }
}


