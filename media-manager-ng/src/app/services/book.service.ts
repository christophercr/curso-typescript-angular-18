import { Injectable, signal, type Signal } from '@angular/core';
import { MediaServiceImpl } from './media.service';
import { Book } from '../models/book.model';
import { MediaCollection } from '../models/media-collection.model';
import { BehaviorSubject, delay, forkJoin, map, ReplaySubject, Subject, switchMap, type Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService extends MediaServiceImpl<Book> {
  private _bookCollections: Map<string, MediaCollection<Book>> = new Map<string, MediaCollection<Book>>();
  // usamos BehaviorSubject para que cualquiera que se suscriba, apenas lo haga, reciba el último valor emitido
  private _bookCollectionsSubject$ = new BehaviorSubject<Map<string, MediaCollection<Book>>>(new Map());
  // usamos una signal que por definición guarda el valor más reciente (último valor emitido)
  private _bookCollectionsSignal = signal<Map<string, MediaCollection<Book>>>(new Map());

  constructor() {
    super(Book);
  }

  get bookCollections$(): Observable<Map<string, MediaCollection<Book>>> {
    return this._bookCollectionsSubject$.asObservable();
  }

  get bookCollectionsSignal(): Signal<Map<string, MediaCollection<Book>>> {
    return this._bookCollectionsSignal.asReadonly();
  }

  reloadBookCollections(): Observable<void> {
    /*
    return this.getMediaCollectionIdentifiersList().pipe(
      map((keys) => {
        this._bookCollections.clear(); // clear the current state
        keys.forEach((key) => {
          this.loadMediaCollection(key).then((collection) => {
            this._bookCollections.set(key, collection);
          });
        });
        return;
      }),
    );
    */

    return this.getMediaCollectionIdentifiersList().pipe(
      delay(1000), // simular una respuesta lenta de nuestro servidor de API
      switchMap((keys) => {
        const observablesArray$ = keys.map((item) => {
          return this.loadMediaCollection(item);
        });

        return forkJoin(observablesArray$);
      }),
      map((collections) => {
        this._bookCollections.clear(); // clear the current state

        collections.forEach((collection) => {
          this._bookCollections.set(collection.identifier, collection);
        });
        // en mundo observables
        this._bookCollectionsSubject$.next(new Map(this._bookCollections)); // genero un nuevo mapa para cambiar la referencia de memória y lo emito
        // en mundo signals
        this._bookCollectionsSignal.set(new Map(this._bookCollections)); // genero un nuevo mapa para cambiar la referencia de memória y lo emito

        return;
      }),
    );
  }

  createBookCollection(name: string): void {
    console.log('Creating a new book collection: ', name);

    const newBookCollection: MediaCollection<Book> = new MediaCollection<Book>(Book, name);
    this._bookCollections.set(newBookCollection.identifier, newBookCollection);

    this.saveMediaCollection(newBookCollection)
      .then(() => {
        console.log(
          `New book collection called "${newBookCollection.name}" saved successfully. Identifier: `,
          newBookCollection.identifier,
        );
      })
      .catch((_) => {
        this.displayErrorMessage(`Failed to save the new book collection called ${name}`);
      });
  }

  removeBookCollection(identifier: string): void {
    if (!identifier) {
      throw new Error('An identifier must be provided');
    }

    this._bookCollections.delete(identifier);
    this.removeMediaCollection(identifier)
      .then(() => {
        console.log('Removed the collection with identifier: ', identifier);
      })
      .catch((_) => {
        this.displayErrorMessage('Failed to remove the collection!');
      });
  }

  createBook(collectionIdentifier: string, book: Book): void {
    if (!collectionIdentifier) {
      throw new Error('The collection identifier is required to create a new book!');
    }

    if (!this._bookCollections.has(collectionIdentifier) || !this._bookCollections.get(collectionIdentifier)) {
      console.error('Tried to add a book to an unknown collection. Identifier: ', collectionIdentifier);
      this.displayErrorMessage('Failed to create the new book!');
      return;
    }

    const existingCollection = this._bookCollections.get(collectionIdentifier);
    if (!existingCollection || !book) {
      throw new Error("The collection couldn't be retrieved or we could not get the book details from the view!");
    }

    existingCollection.addMedia(book);

    this.saveMediaCollection(existingCollection, 'create-collection-item', book, collectionIdentifier)
      .then(() => {
        console.log(`Book collection called "${existingCollection.name}" updated successfully.`);
      })
      .catch((error) => {
        console.error('Error while updating an existing book collection: ', error);
        this.displayErrorMessage(`Failed to update the existing book collection called ${existingCollection.name}`);
      });
  }

  removeBook(collectionIdentifier: string, bookIdentifier: string) {
    if (!collectionIdentifier) {
      throw new Error('The collection identifier must be provided!');
    }

    if (!bookIdentifier) {
      throw new Error('The book identifier must be provided!');
    }

    console.log(`Removing book ${bookIdentifier} which should be part of collection ${collectionIdentifier}`);

    const existingCollection = this._bookCollections.get(collectionIdentifier);
    if (!existingCollection) {
      throw new Error("The collection couldn't be retrieved or we could not get the book details from the view!");
    }

    existingCollection.removeMedia(bookIdentifier);

    this.saveMediaCollection(existingCollection, 'remove-collection-item', bookIdentifier)
      .then(() => {
        console.log(`Book collection called "${existingCollection.name}" updated successfully.`);
      })
      .catch((error) => {
        console.error('Error while updating an existing book collection: ', error);
        this.displayErrorMessage(
          `Failed to save the modifications made to the ${existingCollection.name} book collection (removal of the following book: ${bookIdentifier}`,
        );
      });
  }
}
