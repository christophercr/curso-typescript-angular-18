import {Expose, Type} from "class-transformer";
import {Media} from "./media";
import {Genre} from "../enums/genre";

export class Book extends Media {
  private _author: string;
  private _numberOfPages: number;

  constructor(
    name: string,
    description: string,
    pictureLocation: string,
    genre: Genre,
    author: string,
    numberOfPages: number,
    identifier?: string
  ) {
    this._numberOfPages = numberOfPages;
    this._author = author;
  }

  @Expose()
  get author(): string {
    return this._author;
  }

  set author(author: string) {
    this._author = author;
  }

  @Expose()
  @Type(() => Number)
  get numberOfPages(): number {
    return this._numberOfPages;
  }

  set numberOfPages(numberOfPages: number) {
    this._numberOfPages = numberOfPages;
  }
}
