import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CreatesurveyComponent } from './pages/createsurvey/createsurvey.component';
import { ManageSurveyComponent } from './pages/manage-survey/manage-survey.component';
import { SurveySolverComponent } from './pages/survey-solver/survey-solver.component';
import { SignInComponent } from './pages/login/sign-in/sign-in.component';
import { AuthGuard } from './guards/auth.guard';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path : 'createsurvey', component: CreatesurveyComponent, canActivate: [AuthGuard]},
  { path: 'managesurvey', component: ManageSurveyComponent, canActivate: [AuthGuard]},
  { path: 'survey-solver', component: SurveySolverComponent, canActivate: [AuthGuard]},
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  { path: 'sign-in', component: SignInComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
