import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewMediaCollectionComponent } from "./components/new-media-collection/new-media-collection.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NewMediaCollectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'media-manager-ng';
  showComponent = false;

  public toggleComponent() {
    this.showComponent = !this.showComponent;
  }

  public onCollectionReload(data: unknown) {
    console.log('AppComponent: Collection reload event received', data);
  }
}
