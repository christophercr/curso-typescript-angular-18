import {MediaCollection} from "./entities/media-collection";
import {Book} from "./entities/book";
import {Genre} from "./enums/genre";

export interface MediaManagerView {
  getNewBookCollectionName(): string;

  renderBookCollection(bookCollection: Readonly<MediaCollection<Book>>): void;

  displayErrorMessage(message: string): void;

  clearBookCollections(): void;

  removeBookCollection(identifier: string): void;

  getNewBookDetails(collectionIdentifier: string): { error?: string, book?: Readonly<Book> };

  renderBook(collectionIdentifier: string, book: Readonly<Book>): void;

  removeBook(collectionIdentifier: string, bookIdentifier: string): void;

  clearNewBookForm(collectionIdentifier: string): void;

  clearNewBookCollectionForm(): void;
}

export class HTMLMediaManagerView implements MediaManagerView {
  private readonly _newBookCollectionForm: HTMLFormElement;
  private readonly _newBookCollectionName: HTMLInputElement;
  private readonly _bookCollectionsContainer: HTMLDivElement;

  private readonly _genreOptions: string = "";

  constructor() {
    const newBookCollectionForm = document.querySelector<HTMLFormElement>('#newBookCollection');
    const newBookCollectionName = document.querySelector<HTMLInputElement>('#newBookCollectionName');
    const bookCollectionsContainer = document.querySelector<HTMLDivElement>("#bookCollections");

    if (!newBookCollectionForm) {
      throw new Error("Could not initialize the view. The 'newBookCollection' element id was not found. Was the template changed?");
    }

    this._newBookCollectionForm = newBookCollectionForm;

    if (!newBookCollectionName) {
      throw new Error("Could not initialize the view. The 'newBookCollectionName' element id was not found. Was the template changed?");
    }
    this._newBookCollectionName = newBookCollectionName;
    

    if (!bookCollectionsContainer) {
      throw new Error("Could not initialize the view. The 'bookCollections' element id was not found. Was the template changed?");
    }

    this._bookCollectionsContainer = bookCollectionsContainer;

    let prueba = Genre;

    for (let genreKey in Genre) {
      this._genreOptions += `<option value="${genreKey}">${Genre[genreKey as keyof typeof Genre]}</option>">`;
    }
  }

  getNewBookCollectionName() {
    // construyendo sobre la validación estándar del DOM de HTML
    if (this._newBookCollectionName.checkValidity() === false) {
      this._newBookCollectionName.reportValidity();
      throw new Error("Invalid collection name!");
    }
    return this._newBookCollectionName.value;
  }

  renderBook(collectionIdentifier: string, book: Readonly<Book>): void {
    if (!book) {
      throw new Error("The book to render must be provided!");
    }

    const collectionTableBody = document.getElementById(`collectionTableBody-${collectionIdentifier}`) as HTMLTableSectionElement;

    if (!collectionTableBody) {
      throw new Error(`The table body for collection ${collectionIdentifier} could not be found! Was the template changed?`);
    }

    const tableRow: HTMLTableRowElement = collectionTableBody.insertRow();

    tableRow.id = `book-${collectionIdentifier}-${book.identifier}`;

    tableRow.innerHTML = `
                <td>
                    <img class="mediaImage" src="${book.pictureLocation}">
                </td>
                <td>${book.name}</td>
                <td>${book.genre}</td>
                <td>${book.description}</td>
                <td>${book.author}</td>
                <td>${book.numberOfPages}</td>
                <td>
                    <a href="#" onclick="mediaManagerController.removeBook('${collectionIdentifier}','${book.identifier}');">X</a>
                </td>
        `;

    collectionTableBody.appendChild(tableRow);
  }

  renderBookCollection(bookCollection: Readonly<MediaCollection<Book>>): void {
    this._bookCollectionsContainer.innerHTML += `
        <div id="bookCollection-${bookCollection.identifier}" class="collection">
            <h3 class="collectionName">${bookCollection.name}</h3>

            <div class="containerGroup">
                <div class="container">
                    <h3>New book</h3>

                    <form id="newBook-${bookCollection.identifier}" action="#">
                        <ul>
                            <li>
                                <input id="newBookName-${bookCollection.identifier}" type="text" title="Name" placeholder="Name" required>
                                <input id="newBookAuthor-${bookCollection.identifier}" type="text" placeholder="Author" required>
                            </li>
                            <li>
                                <select id="newBookGenre-${bookCollection.identifier}" required>
                                    ${this._genreOptions}
                                </select>
                                <input id="newBookPages-${bookCollection.identifier}" type="number" placeholder="Pages" required>
                            </li>
                            <li>
                                <input id="newBookPicture-${bookCollection.identifier}" type="url" title="Picture" placeholder="Picture URL">
                            </li>
                            <li>
                                <textarea id="newBookDescription-${bookCollection.identifier}" placeholder="Description"></textarea>
                            </li>
                        </ul>
                        <input type="button" value="Create" onclick="mediaManagerController.createBook('${bookCollection.identifier}');" />
                    </form>
                </div>
                <div class="collectionToolsContainer">
                    <h3>Tools</h3>
                    <form action="#">
                        <input type="button" value="Remove collection" onclick="mediaManagerController.removeBookCollection('${bookCollection.identifier}');" />
                    </form>
                </div>
            </div>

            <div class="containerGroup">
                <div class="container">
                    <table class="collectionTable">
                        <thead>
                        <tr>
                            <td>Picture</td>
                            <td>Name</td>
                            <td>Genre</td>
                            <td>Description</td>
                            <td>Author</td>
                            <td>Pages</td>
                            <td>Remove</td>
                        </tr>
                        </thead>
                        <tbody id="collectionTableBody-${bookCollection.identifier}"></tbody>
                    </table>
                </div>
            </div>
        </div>
        `;

    bookCollection.collection.forEach(book => {
      this.renderBook(bookCollection.identifier, book);
    });
  }

  clearBookCollections(): void {
    this._bookCollectionsContainer.innerHTML = "";
  }

  removeBookCollection(identifier: string) {
    const bookCollectionDOMNode: HTMLDivElement = document.getElementById(`bookCollection-${identifier}`) as HTMLDivElement;
    if (!bookCollectionDOMNode) {
      throw new Error("Could not remove the book collection from the DOM. Couldn't find the DOM node");
    } else {
      bookCollectionDOMNode.remove();
    }
  }

  displayErrorMessage(errorMessage: string) {
    if (!errorMessage) {
      throw new Error("An error message must be provided!");
    }
    alert(errorMessage); // mala experiencia de usuario, pero ignoremos esto por ahora
  }

  getNewBookDetails(collectionIdentifier: string): { error?: string, book?: Book } {
    if (!collectionIdentifier) {
      // lanzamos este porque significa que hay un error!
      throw new Error("The collection identifier must be provided!");
    }

    // obligatorio
    const newBookForm = document.getElementById(`newBook-${collectionIdentifier}`) as HTMLFormElement;

    if (!newBookForm) {
      throw new Error(`Could not find the new book form for collection ${collectionIdentifier}`);
    }

    // construyendo sobre la validación estándar del DOM de HTML
    if (newBookForm.checkValidity() === false) {
      newBookForm.reportValidity();
      return {
        error: "The new book form is invalid!"
      };
    }

    // de aquí en adelante, no es necesario verificar la validez de los campos específicos del formulario
    // solo necesitamos verificar si se pueden encontrar los campos
    const newBookNameField = document.querySelector<HTMLInputElement>(`#newBookName-${collectionIdentifier}`);
    if (!newBookNameField) {
      throw new Error("The new book form's name input was not found! Did the template change?");
    }
    const newBookAuthorField = document.querySelector<HTMLInputElement>(`#newBookAuthor-${collectionIdentifier}`);
    if (!newBookAuthorField) {
      throw new Error("The new book form's author input was not found! Did the template change?");
    }
    const newBookGenreSelect = document.querySelector<HTMLSelectElement>(`#newBookGenre-${collectionIdentifier}`);
    if (!newBookGenreSelect) {
      throw new Error("The new book form's genre select was not found! Did the template change?");
    }
    const newBookPagesField = document.querySelector<HTMLInputElement>(`#newBookPages-${collectionIdentifier}`);
    if (!newBookPagesField) {
      throw new Error("The new book form's page input was not found! Did the template change?");
    }

    // opcionales
    const newBookPictureField = document.querySelector<HTMLInputElement>(`#newBookPicture-${collectionIdentifier}`);
    if (!newBookPictureField) {
      throw new Error("The new book form's picture input was not found! Did the template change?");
    }
    const newBookDescriptionField = document.querySelector<HTMLTextAreaElement>(`#newBookDescription-${collectionIdentifier}`);
    if (!newBookDescriptionField) {
      throw new Error("The new book form's description input was not found! Did the template change?");
    }

    const newBookGenre = Genre[newBookGenreSelect.value as keyof typeof Genre];

    const newBookNumberOfPages = Number.parseInt(newBookPagesField.value);

    return {
      book: new Book(newBookNameField.value, newBookDescriptionField.value, newBookPictureField.value, newBookGenre, newBookAuthorField.value, newBookNumberOfPages)
    };
  }

  removeBook(collectionIdentifier: string, bookIdentifier: string) {
    if (!collectionIdentifier) {
      throw new Error("The collection identifier must be provided!");
    }

    if (!bookIdentifier) {
      throw new Error("The book identifier must be provided!");
    }

    const bookElement = document.getElementById(`book-${collectionIdentifier}-${bookIdentifier}`) as HTMLInputElement;
    if (!bookElement) {
      throw new Error("The element corresponding to the book to remove could not be found! Did the template change?");
    }

    bookElement.remove();
  }

  clearNewBookForm(collectionIdentifier: string) {
    if (!collectionIdentifier) {
      throw new Error("The collection identifier must be provided!");
    }

    const newBookForm = document.getElementById(`newBook-${collectionIdentifier}`) as HTMLFormElement;

    if (!newBookForm) {
      throw new Error(`Could not find the new book form for collection ${collectionIdentifier}`);
    }

    newBookForm.reset();
  }

  clearNewBookCollectionForm() {
    this._newBookCollectionForm.reset();
  }
}
