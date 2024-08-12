import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Personlogin, PersonResponseLogin } from 'src/app/model/personLogin.model';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginErrorSwitch: boolean = false;
  loginError: string = '';
  formLogin: FormGroup;

  constructor(private form: FormBuilder, private router: Router, private _authService: AuthService) {
    this.formLogin = this.form.group({
      Correo: ['', [Validators.required, Validators.email]],
      Contrasenna: ['', Validators.required]
    });
  }

  login() {
    if (this.formLogin.valid) {
      const credentials: Personlogin = {
        Email: this.formLogin.value.Correo,
        Password: this.formLogin.value.Contrasenna
      };

      this._authService.verifyCredentials(credentials).subscribe({
        next: (response: PersonResponseLogin) => {
          if (response.success) {
            this.router.navigate(['/home']);
            this._authService.login(response);
          } else {
            this.loginError = 'Error: algo no está bien, intenta de nuevo.';
            this.loginErrorSwitch = true;
          }
        },
        error: (error: any) => {
          console.error(error);
          this.loginError = 'Error: algo no está bien, intenta de nuevo.';
          this.loginErrorSwitch = true;
        }
      });
    } else {
      this.formLogin.markAllAsTouched();
    }
  }

  redirectToRegister(): void {
    this.router.navigate(['/sign-in']);
  }

  hasErrors(controlName: string, errorType: string) {
    return this.formLogin.get(controlName)?.hasError(errorType) && this.formLogin.get(controlName)?.touched;
  }
}
