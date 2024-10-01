import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page/home-page.component';
import { NewMediaCollectionComponent } from './components/new-media-collection/new-media-collection.component';
import { NewBookComponent } from './components/new-book/new-book.component';
import { CollectionListComponent } from './components/collection-list/collection-list.component';
import { adminGuard } from './guards/admin.guard';
//import { BooksPageComponent } from './pages/books-page/books-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'books',
    // Mejora en performance: el código de este componente ya no se incluye en el main.js sino en un fichero JS aparte (chunk)
    loadComponent: () => import('./pages/books-page/books-page.component').then((module) => module.BooksPageComponent),
    canActivate: [adminGuard],
    children: [
      {
        path: 'new-collection',
        component: NewMediaCollectionComponent,
      },
      {
        path: 'new-book',
        component: NewBookComponent,
      },
      {
        path: 'collection-list',
        component: CollectionListComponent,
      },
    ],
    //component: BooksPageComponent,
  },
  {
    path: '**', // ruta por defecto (debe ser la última del array ya que es la que se activa cuando no hay otra ruta que haga match)
    redirectTo: '',
  },
];
