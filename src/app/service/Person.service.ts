// home.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonResponseLogin, PersonSignIn } from '../model/personLogin.model';
import { PersonResponse } from '../model/person.models';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private personApiUrl = sessionStorage.getItem('baseUrl') + '/person'


  constructor(private http: HttpClient) {}

  // Método para obtener información del usuario por ID
  getUserInfo(userId: string): Observable<PersonResponse> {
    return this.http.get<PersonResponse>(`${this.personApiUrl}/${userId}`);
  }

  // Método para crear usuarios
  createUser(user: PersonSignIn): Observable<any> {
    return this.http.post(`${this.personApiUrl}`, user);
  }
}
