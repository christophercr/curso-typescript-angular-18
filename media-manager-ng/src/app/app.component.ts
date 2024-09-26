import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewMediaCollectionComponent } from './components/new-media-collection/new-media-collection.component';
import { CustomButtonDirective } from './directives/custom-button.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NewMediaCollectionComponent, CustomButtonDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'media-manager-ng';
  showComponent = true;
  prueba = ['valor inicial desde app component']

  constructor() {
    setTimeout(() => {
      this.prueba = ['otro valor dinamico'];
    }, 3000);
  }

  public toggleComponent() {
    this.showComponent = !this.showComponent;
  }

  public onCollectionReload(data: unknown) {
    console.log('AppComponent: Collection reload event received', data);
  }
}
