import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SurveyRequest } from 'src/app/model/survey.models';
import { SurveyService } from 'src/app/service/questionnaire/survey.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PersonResponse, Survey } from 'src/app/model/person.models';
@Component({
  selector: 'app-createsurvey',
  templateUrl: './createsurvey.component.html',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule, CommonModule, RouterModule],
  styleUrls: ['./createsurvey.component.css'],
})
export class CreatesurveyComponent implements OnInit {
  private PERSON_ID: string = sessionStorage.getItem('personId')!;
  surveyList: Survey[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private _surveyService: SurveyService
  ) {}

  ngOnInit(): void {
    this.getSurveys();
  }

  surveyForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    startDate: ['', Validators.required],
    startHour: ['', Validators.required],
  });

  getSurveys() {
    this._surveyService.getSurveyByPersonId(this.PERSON_ID).subscribe({
      next: (response: PersonResponse) => {
        this.surveyList = response.value.surveys;
        console.log(this.surveyList);
      },
      error: (error) => {
        console.error('Error al obtener información de la encuesta:', error);
      },
    });
  }

  submitSurvey(): void {
    const date =
      this.surveyForm.value.startDate + 'T' + this.surveyForm.value.startHour;
    const data: SurveyRequest = {
      personId: this.PERSON_ID,
      title: this.surveyForm.value.title!,
      description: this.surveyForm.value.description!,
      startDate: new Date(date),
    };
    this.addSurvey(data);
    this.resetForm();
  }

  addSurvey(survey: SurveyRequest) {
    this._surveyService.createSurvey(survey).subscribe({
      next: (result) => {
        console.log('Cuestionario agregado correctamente!', result);
        this.getSurveys();
      },
      error: (err) => {
        console.error('Error al agregar encuesta', err);
      },
    });
  }

  deleteSurvey(id: string) {
    this._surveyService.deleteSurveyById(id).subscribe({
      next: (result) => {
        console.log('Escuesta agregadA correctamente!', result);
        this.getSurveys();
      },
      error: (err) => {
        console.error('Error al agregar cuestionario', err);
      },
    });
  }

  resetForm() {
    this.surveyForm.reset();
  }
}
