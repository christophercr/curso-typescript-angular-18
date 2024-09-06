import "reflect-metadata";
import {Book} from "./entities/book";
import {Movie} from "./entities/movie";
import {MediaServiceImpl} from "./services/media-service";
import {HTMLMediaManagerView} from "./media-manager-view";
import {MediaManagerController, MediaManagerControllerImpl} from "./media-manager-controller";

console.log("----------- MediaManagerApp - Loading...");

const view: HTMLMediaManagerView = new HTMLMediaManagerView();

const bookService = new MediaServiceImpl<Book>(Book);
console.log("Book service initialized: ", bookService);

const movieService = new MediaServiceImpl<Movie>(Movie);
console.log("Movie service initialized: ", movieService);

const mediaManController = new MediaManagerControllerImpl(view, bookService, movieService);

interface CustomWindow extends Window {
  mediaManagerController?: MediaManagerController
}

const customWindow: CustomWindow = window;
customWindow.mediaManagerController = mediaManController;

console.log("----------- MediaManagerApp ready!", customWindow.mediaManagerController);
