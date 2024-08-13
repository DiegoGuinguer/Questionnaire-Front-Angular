import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonResponse } from 'src/app/model/person.models';
import { AuthService } from 'src/app/service/auth/auth.service';
import { PersonService } from 'src/app/service/Person.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userId: string | null = null;
  userInfo: PersonResponse['value'] | null = null;
  isEditing = false;

  profileForm: FormGroup;

  constructor(
    private personService: PersonService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      nameUser: [''],
      name: [''],
      email: [''],
      isAdmin: [false],
      created: [{ value: '', disabled: true }],
      lastModified: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userId = this.authService.id;
    if (this.userId) {
      this.personService.getUserInfo(this.userId).subscribe({
        next: (response) => {
          this.userInfo = response.value;
          this.profileForm.patchValue({
            nameUser: this.userInfo.userName,
            name: this.userInfo.name,
            email: this.userInfo.email,
            isAdmin: this.userInfo.isAdmin,
            created: this.userInfo.created,
            lastModified: this.userInfo.lastModified
          });
        },
        error: (error) => {
          console.error('Error al obtener información del usuario:', error);
        }
      });
    }
  }

  toggleEdit(): void {
    if (this.isEditing) {
      this.saveChanges();
    }
    this.isEditing = !this.isEditing;
  }

  saveChanges(): void {
    if (this.userId && this.profileForm.valid) {
      const updatedUserInfo = {
        id: this.userId,
        nameUser: this.profileForm.value.nameUser,
        name: this.profileForm.value.name,
        email: this.profileForm.value.email,
        isAdmin: this.profileForm.value.isAdmin
      };

      this.personService.updateUser(this.userId, updatedUserInfo).subscribe({
        next: (response) => {
          console.log('Perfil actualizado con éxito:', response);
          this.loadUserProfile();
        },
        error: (error) => {
          console.error('Error al actualizar perfil:', error);
        }
      });
    }
  }
}
