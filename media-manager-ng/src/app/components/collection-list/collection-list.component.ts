import { Component, inject } from '@angular/core';
import { BookService } from '../../services/book.service';
import { KeyValuePipe } from '@angular/common';
import { BookListComponent } from '../book-list/book-list.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';

@Component({
  selector: 'app-collection-list',
  standalone: true,
  imports: [KeyValuePipe, BookListComponent, CdkAccordionModule],
  templateUrl: './collection-list.component.html',
  styleUrl: './collection-list.component.css'
})
export class CollectionListComponent {
 
  private readonly _bookService = inject(BookService);

  public bookCollections = this._bookService.bookCollections;

  removeBookCollection(identifier: string): void {
    this._bookService.removeBookCollection(identifier);
  }

  removeBook(collectionIdentifier: string, bookIdentifier: string) {
    this._bookService.removeBook(collectionIdentifier, bookIdentifier);
  }

}
