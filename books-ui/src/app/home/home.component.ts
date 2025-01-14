import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { SelectItem } from '../models/select-item.interface';
import { BookFilters } from '../models/book-filters.interface';
import { HomeService } from '../services/home.service';
import { formatText } from '../shared/format-text.utils';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputNumberModule,
    SelectModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  filters: BookFilters = {};
  categories: SelectItem[] = [];
  languages: SelectItem[] = [];

  constructor(
    private router: Router,
    private homeService: HomeService
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadLanguages();
  }

  private loadCategories() {
    this.homeService.getCategories().subscribe(
      (categories) => {
        this.categories = categories.map(category => ({
          label: formatText(category),
          value: category
        }));
      },
      (error) => {
        console.error('Error while fetching categories:', error);
      }
    );
  }

  private loadLanguages() {
    this.homeService.getLanguages().subscribe(
      (languages) => {
        this.languages = languages.map(language => ({
          label: language,
          value: language
        }));
      },
      (error) => {
        console.error('Error while fetching languages:', error);
      }
    );
  }

  searchBooks() {
    const queryParams: Partial<BookFilters> = {};

    if (this.filters.category) {
      queryParams.category = this.filters.category.toLowerCase();
    }
    if (this.filters.language) {
      queryParams.language = this.filters.language.toLowerCase();
    }
    if (this.filters.max_price) {
      queryParams.max_price = this.filters.max_price;
    }
    if (this.filters.max_pages) {
      queryParams.max_pages = this.filters.max_pages;
    }

    this.router.navigate(['/books'], { queryParams });
  }

  isAnyFilterSet(): boolean {
    return !!(this.filters.category ||
              this.filters.language ||
              this.filters.max_price ||
              this.filters.max_pages);
  }
}
