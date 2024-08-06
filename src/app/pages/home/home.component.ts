// home.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { Result } from 'src/app/model/person.models';
import { PersonService } from 'src/app/service/Person.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userId: string | null = null;
  userInfo: Result['value'] | null = null;
  isAuthenticated = (sessionStorage.getItem('isAuthenticated')?.toString() =="true");

  constructor(
    private personService: PersonService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.Id;
    if (this.userId) {
      this.personService.getUserInfo(this.userId).subscribe({
        next: (response: Result) => {
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
