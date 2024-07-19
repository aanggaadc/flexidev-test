import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPeople, IPerson } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  private baseUrl: string = 'https://swapi.dev/api';

  constructor(private http: HttpClient) {}

  getPeople(): Observable<IPeople> {
    return this.http.get<IPeople>(`${this.baseUrl}/people/`);
  }

  getPerson(id: number): Observable<IPerson> {
    return this.http.get<IPerson>(`${this.baseUrl}/people/${id}`);
  }
}
