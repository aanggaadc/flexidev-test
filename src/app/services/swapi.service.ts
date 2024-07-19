import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  private baseUrl: string = 'https://swapi.dev/api';

  constructor(private http: HttpClient) {}

  getPeople(): Observable<any> {
    return this.http.get(`${this.baseUrl}/people/`);
  }

  getPerson(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/people/${id}`);
  }
}
