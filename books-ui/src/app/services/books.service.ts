import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookFilters } from '../models/book-filters.interface';
import { Book } from '../models/book.interface';
import { BookDetails } from '../models/book-details.interface';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private baseUrl: string = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  searchBooks(filters: Partial<BookFilters>): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/filter`, { params: filters as any });
  }

  getBookDetails(bookTitle: string): Observable<BookDetails> {
    return this.http.get<BookDetails>(`${this.baseUrl}/book/${bookTitle}`);
  }

  getFullImageUrl(url: string): string {
    return `${this.baseUrl}${url}`;
  }
} 