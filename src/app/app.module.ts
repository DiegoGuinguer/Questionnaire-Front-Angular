import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreatesurveyComponent } from './pages/createsurvey/createsurvey.component';
import { ManageSurveyComponent } from './pages/manage-survey/manage-survey.component';
import { SurveySolverComponent } from './pages/survey-solver/survey-solver.component';
import { SignInComponent } from './pages/login/sign-in/sign-in.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';


@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, ManageSurveyComponent, SurveySolverComponent, SignInComponent, UserProfileComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CreatesurveyComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
