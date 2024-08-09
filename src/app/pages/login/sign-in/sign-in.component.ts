import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonSignIn } from 'src/app/model/personLogin.model';
import { PersonService } from 'src/app/service/Person.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  formSignIn: FormGroup;
  loginErrorSwitch = false;
  loginError = '';

  constructor(private fb: FormBuilder, private personService: PersonService, private router: Router) {
    this.formSignIn = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  signIn(): void {

    const credenciales: PersonSignIn = {
      userName: this.formSignIn.value.userName,
      password: this.formSignIn.value.password,
      name: this.formSignIn.value.name,
      email: this.formSignIn.value.email
    };

    if (this.formSignIn.valid) {
      this.personService.createUser(credenciales).subscribe({
        next: (response: any) => {
          if(response.success)
          {
            this.redirectToLogin();
          }else
          {
            this.loginError = 'Error: Al guardar los datos';
          }
        }
      })
    } else {
      this.loginErrorSwitch = true;
      this.loginError = 'Por favor, corrige los errores en el formulario.';
    }
  }

  hasErrors(controlName: string, errorType: string) {
    return this.formSignIn.get(controlName)?.hasError(errorType) && this.formSignIn.get(controlName)?.touched;
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}
