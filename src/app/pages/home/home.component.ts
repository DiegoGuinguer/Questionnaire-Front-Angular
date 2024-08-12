// home.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { PersonService } from 'src/app/service/Person.service';
import { Router } from '@angular/router';
import { PersonResponse } from 'src/app/model/person.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userId: string | null = null;
  userInfo: PersonResponse['value'] | null = null;
  isAuthenticated =
    sessionStorage.getItem('isAuthenticated')?.toString() == 'true';

  constructor(
    private personService: PersonService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.id;
    if (this.userId) {
      this.personService.getUserInfo(this.userId).subscribe({
        next: (response: PersonResponse) => {
          this.userInfo = response.value;
          this.isAuthenticated = response.success;
        },
        error: (error) => {
          console.error('Error al obtener información del usuario:', error);
          this.isAuthenticated = false;
        },
      });
    }
  }

  navigateToSurvey(surveyId: string): void {
    sessionStorage.setItem('currentSurveyId', surveyId);
  }
}
