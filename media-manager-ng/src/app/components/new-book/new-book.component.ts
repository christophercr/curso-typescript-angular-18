import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Genre } from '../../constants/genre.constants';
import { Book } from '../../models/book.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-new-book',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './new-book.component.html',
  styleUrl: './new-book.component.css',
})
export class NewBookComponent implements OnInit {
  @Output()
  created: EventEmitter<Book> = new EventEmitter<Book>();

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]),
    numberOfPages: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    pictureLocation: new FormControl(''),
    description: new FormControl(''),
  });
  genres: string[] = [];

  ngOnInit() {
    for (const genreKey of Object.keys(Genre)) {
      this.genres.push(genreKey);
    }

    this.myForm.controls.pictureLocation.disable();

    this.myForm.statusChanges.subscribe((status) => {
      console.log('myForm status changed: ', status);
      /*console.log('touched: ', this.myForm.touched);
      console.log('untouched: ', this.myForm.untouched);
      console.log('pristine: ', this.myForm.pristine);
      console.log('dirty: ', this.myForm.dirty);*/
    });
  }

  createBook(): void {
    if (this.myForm.valid) {
      const rawValue: any = this.myForm.getRawValue();

      for (const key of Object.keys(rawValue)) {
        rawValue[key] = rawValue[key] === null ? undefined : rawValue[key];
      }

      const bookToCreate: Book = new Book(
        rawValue.name,
        rawValue.description === null ? undefined : rawValue.description,
        rawValue.pictureLocation === null ? undefined : rawValue.pictureLocation,
        Genre[rawValue.genre as keyof typeof Genre],
        rawValue.author,
        rawValue.numberOfPages,
      );

      this.created.emit(bookToCreate);
      this.myForm.reset();
    }
  }
}
