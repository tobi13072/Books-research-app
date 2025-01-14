import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';
import { ImageModule } from 'primeng/image';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Book } from '../models/book.interface';
import { BookDetails } from '../models/book-details.interface';
import { BooksService } from '../services/books.service';
import { formatText } from '../shared/format-text.utils';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    DividerModule,
    DialogModule,
    ImageModule,
    ProgressSpinnerModule
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {
  foundBooks: Book[] = [];
  searchParams: Record<string, string> = {};
  selectedBook: BookDetails | null = null;
  showDialog: boolean = false;
  isLoadingCover: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public booksService: BooksService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchParams = params;
      if (Object.keys(params).length > 0) {
        this.searchBooks(params);
      }
    });
  }

  private searchBooks(params: any) {
    this.booksService.searchBooks(params).subscribe(
      (response) => {
        this.foundBooks = response;
      },
      (error) => {
        console.error('Error while fetching books:', error);
      }
    );
  }

  showBookDetails(bookTitle: string) {
    this.isLoadingCover = true;
    this.selectedBook = null;
    this.showDialog = true;

    this.booksService.getBookDetails(bookTitle).subscribe(
      (response) => {
        this.selectedBook = response;
        const img = new Image();
        img.onload = () => {
          this.isLoadingCover = false;
        };
        img.src = this.booksService.getFullImageUrl(response.cover_url);
      },
      (error) => {
        console.error('Error while fetching book details:', error);
        this.isLoadingCover = false;
      }
    );
  }

  goBack() {
    this.router.navigate(['/']);
  }

  protected readonly formatText = formatText;
}
