import { Component,EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../models/book.model';




@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})

export class BookListComponent {
@Input()
public books : Book[] = [];

@Output()
removedBook = new EventEmitter<string>();

removebook(bookId : string) : void {

}

}
