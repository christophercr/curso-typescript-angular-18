import { Component, inject, type OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewBookComponent } from '../../components/new-book/new-book.component';
import { BookListComponent } from '../../components/book-list/book-list.component';
import { KeyValuePipe } from '@angular/common';
import { BookService } from '../../services/book.service';
import type { Book } from '../../models/book.model';

@Component({
  selector: 'app-books-page',
  standalone: true,
  imports: [ReactiveFormsModule, NewBookComponent, BookListComponent, KeyValuePipe],
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.css',
  providers: [BookService],
})
export class BooksPageComponent implements OnInit {
  private readonly _bookService = inject(BookService);

  public formulario = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  public bookCollections = this._bookService.bookCollections;

  ngOnInit() {
    this._bookService.reloadBookCollections();
  }

  createBookCollection(): void {
    if (this.formulario.valid) {
      this._bookService.createBookCollection(this.formulario.value);
      this.formulario.reset();
    }
  }

  removeBookCollection(identifier: string): void {
    this._bookService.removeBookCollection(identifier);
  }

  createBook(book: Book, collectionIdentifier: string): void {
    this._bookService.createBook(collectionIdentifier, book);
  }

  removeBook(collectionIdentifier: string, bookIdentifier: string) {
    this._bookService.removeBook(collectionIdentifier, bookIdentifier);
  }

  reloadBookCollections(): void {
    this._bookService.reloadBookCollections();
  }
}
