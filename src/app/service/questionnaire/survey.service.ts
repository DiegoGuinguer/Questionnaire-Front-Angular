import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SurveyRequest, SurveyResponseById } from 'src/app/model/survey.models';
import { SurveyResponse } from 'src/app/model/survey.models';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  constructor(private http: HttpClient) {}

  private baseUrl = sessionStorage.getItem('baseUrl') + `/survey`;

  postSurvey(survey: SurveyRequest): Observable<any> {
    return this.http.post<SurveyResponse>(`${this.baseUrl}`, survey);
  }

  getSurveyById(id: string): Observable<SurveyResponseById> {
    return this.http.get<SurveyResponseById>(`${this.baseUrl}/${id}`);
  }

  getAllSurveys(): Observable<SurveyResponse> {
    return this.http.get<SurveyResponse>(`${this.baseUrl}`);
  }

  deleteSurveyById(id: string): Observable<SurveyResponse> {
    return this.http.delete<SurveyResponse>(`${this.baseUrl}/${id}`);
  }
}
