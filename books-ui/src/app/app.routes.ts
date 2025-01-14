import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'books', component: BooksComponent }
];
