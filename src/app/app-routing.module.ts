import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CreatesurveyComponent } from './pages/createsurvey/createsurvey.component';
import { ManageSurveyComponent } from './pages/manage-survey/manage-survey.component';
import { SurveySolverComponent } from './pages/survey-solver/survey-solver.component';
import { SignInComponent } from './pages/login/sign-in/sign-in.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path : 'createsurvey', component: CreatesurveyComponent},
  { path: 'managesurvey', component: ManageSurveyComponent},
  { path: 'survey-solver', component: SurveySolverComponent},
  { path: 'sign-in', component: SignInComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
