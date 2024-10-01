import 'reflect-metadata';
import { Component, inject, type OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewBookComponent } from '../../components/new-book/new-book.component';
import { BookListComponent } from '../../components/book-list/book-list.component';
import { KeyValuePipe } from '@angular/common';
import { BookService } from '../../services/book.service';
import type { Book } from '../../models/book.model';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NewMediaCollectionComponent } from '../../components/new-media-collection/new-media-collection.component';
import { CollectionListComponent } from '../../components/collection-list/collection-list.component';
import { delay } from 'rxjs';

@Component({
  selector: 'app-books-page',
  standalone: true,
  imports: [ReactiveFormsModule, NewBookComponent, BookListComponent, KeyValuePipe, RouterLink, NewMediaCollectionComponent, RouterOutlet],
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.css',
  providers: [BookService],
})
export class BooksPageComponent implements OnInit {
  private readonly _bookService = inject(BookService);
  private readonly _router = inject(Router);
  private readonly _currentRoute = inject(ActivatedRoute);

  public bookCollections = this._bookService.bookCollections;

  ngOnInit() {
    this._bookService.reloadBookCollections();
  }

  createBookCollection(name: string): void {
    this._bookService.createBookCollection(name);
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

  changeView(view: string) {
    this._router.navigate([view], { relativeTo: this._currentRoute });
  }
  onRouteActivated(component: CollectionListComponent | NewMediaCollectionComponent | NewBookComponent) {
    console.log('------ route activated', component);
    if (component instanceof NewBookComponent) {
      component.created.pipe(delay(3000)).subscribe((book) => {
        //delay();
        this._router.navigate(['collection-list'], { relativeTo: this._currentRoute });
      });
    } else if (component instanceof NewMediaCollectionComponent) {
      component.collectionCreated.subscribe((collectionName) => {
        this._router.navigate(['collection-list'], { relativeTo: this._currentRoute });
      });
    } else {
      // collection list component
    }
  }
}
