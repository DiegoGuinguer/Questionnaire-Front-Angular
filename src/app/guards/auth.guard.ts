import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated.pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          console.log('Acceso denegado - Usuario no autenticado');
          this.router.navigate(['/login']);
        }
      }),
      map(isAuthenticated => {
        return isAuthenticated;
      })
    );
  }
}
