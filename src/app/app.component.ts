import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'CuestionarioLogin';
  isAuthenticated = false;
  isMenuOpen = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Configuración inicial
    sessionStorage.setItem('baseUrl', 'https://localhost:44321/api/v1');
    this.authService.isAuthenticated.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
