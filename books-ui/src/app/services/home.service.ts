import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseUrl: string = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categories`);
  }

  getLanguages(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/languages`);
  }
} 