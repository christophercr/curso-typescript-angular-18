import {MediaService} from "./services/media-service";
import {Book} from "./entities/book";
import {Movie} from "./entities/movie";
import {MediaCollection} from "./entities/media-collection";
import {MediaManagerView} from "./media-manager-view";

export interface MediaManagerController {
  createBookCollection(): void;

  reloadBookCollections(): void;

  removeBookCollection(identifier: string): void;

  createBook(collectionIdentifier: string): void;

  removeBook(collectionIdentifier: string, bookIdentifier: string): void;
}

export class MediaManagerControllerImpl implements MediaManagerController {
  private readonly _view: MediaManagerView;
  private readonly _bookService: MediaService<Book>;
  private readonly _movieService: MediaService<Movie>;

  private _bookCollections: Map<string, MediaCollection<Book>> = new Map<string, MediaCollection<Book>>();
  private _movieCollections: Map<string, MediaCollection<Movie>> = new Map<string, MediaCollection<Movie>>();

  constructor(view: MediaManagerView, bookService: MediaService<Book>, movieService: MediaService<Movie>) {
    if (!view) {
      throw new Error("The view is mandatory!");
    }
    if (!bookService) {
      throw new Error("The book service is mandatory!");
    }
    if (!movieService) {
      throw new Error("The movie service is mandatory!");
    }

    this._view = view;
    this._bookService = bookService;
    this._movieService = movieService;

    this.reloadBookCollections(); // recargar datos guardados cuando la aplicación se inicie
  }

  reloadBookCollections(): void {
    this._bookService.getMediaCollectionIdentifiersList().then(keys => {
      this._bookCollections.clear(); // borrar el estado actual
      this._view.clearBookCollections(); // borrar los nodos del DOM
      keys.forEach(key => {
        this._bookService.loadMediaCollection(key).then(collection => {
          this._bookCollections.set(key, collection);
          this._view.renderBookCollection(collection);
        });
      });
    });
  }

  createBookCollection() {
    const newBookCollectionName: string = this._view.getNewBookCollectionName();

    console.log("Creating a new book collection: ", newBookCollectionName);

    const newBookCollection: MediaCollection<Book> = new MediaCollection<Book>(Book, newBookCollectionName);
    this._bookCollections.set(newBookCollection.identifier, newBookCollection);

    this._bookService.saveMediaCollection(newBookCollection).then(() => {
      console.log(`New book collection called "${newBookCollection.name}" saved successfully. Identifier: `, newBookCollection.identifier);
      this._view.clearNewBookCollectionForm();
      this._view.renderBookCollection(newBookCollection);
    }).catch(_ => {
      this._view.displayErrorMessage(`Failed to save the new book collection called ${newBookCollectionName}`);
    });
  }

  removeBookCollection(identifier: string) {
    if (!identifier) {
      throw new Error("An identifier must be provided");
    }

    this._bookCollections.delete(identifier);
    this._view.removeBookCollection(identifier);
    this._bookService.removeMediaCollection(identifier).then(() => {
      console.log("Removed the collection with identifier: ", identifier);
    }).catch(_ => {
      this._view.displayErrorMessage("Failed to remove the collection!");
    });
  }

  createBook(collectionIdentifier: string) {
    if (!collectionIdentifier) {
      throw new Error("The collection identifier is required to create a new book!");
    }

    console.log("Retrieving the details about the new book to create...");

    const bookDetailsResult = this._view.getNewBookDetails(collectionIdentifier);

    if (bookDetailsResult.error) {
      console.error("Failed to retrieve the book details: ", bookDetailsResult.error);
      return;
    }

    if (!this._bookCollections.has(collectionIdentifier) || !this._bookCollections.get(collectionIdentifier)) {
      console.error("Tried to add a book to an unknown collection. Identifier: ", collectionIdentifier);
      this._view.displayErrorMessage("Failed to create the new book!");
      return;
    }

    const existingCollection = this._bookCollections.get(collectionIdentifier);
    if (!existingCollection || !bookDetailsResult.book) {
      throw new Error("The collection couldn't be retrieved or we could not get the book details from the view!");
    }

    const newBook: Readonly<Book> = bookDetailsResult.book;

    existingCollection.addMedia(newBook);

    this._bookService.saveMediaCollection(existingCollection)
      .then(() => {
        console.log(`Book collection called "${existingCollection.name}" updated successfully.`);
        this._view.clearNewBookForm(collectionIdentifier);
        this._view.renderBook(existingCollection.identifier, newBook); // aquí estamos seguros que la propiedad book esta definida
      })
      .catch(error => {
        console.error("Error while updating an existing book collection: ", error);
        this._view.displayErrorMessage(`Failed to update the existing book collection called ${existingCollection.name}`);
      });
  }

  removeBook(collectionIdentifier: string, bookIdentifier: string) {
    if (!collectionIdentifier) {
      throw new Error("The collection identifier is required to remove a book!");
    }

    if (!bookIdentifier) {
      throw new Error("The book identifier is required to remove a book");
    }

    console.log(`Removing book ${bookIdentifier} which should be part of collection ${collectionIdentifier}`);

    const existingCollection = this._bookCollections.get(collectionIdentifier);
    if (!existingCollection) {
      throw new Error("The collection couldn't be retrieved or we could not get the book details from the view!");
    }

    existingCollection.removeMedia(bookIdentifier);
    this._bookService.saveMediaCollection(existingCollection)
      .then(() => {
        console.log(`Book collection called "${existingCollection.name}" updated successfully.`);
        this._view.removeBook(collectionIdentifier, bookIdentifier);
      })
      .catch(error => {
        console.error("Error while updating an existing book collection: ", error);
        this._view.displayErrorMessage(`Failed to save the modifications made to the ${existingCollection.name} book collection (removal of the following book: ${bookIdentifier}`);
      });
  }
}
