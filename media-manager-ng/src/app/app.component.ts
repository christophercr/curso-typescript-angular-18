import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewMediaCollectionComponent } from './components/new-media-collection/new-media-collection.component';
import { CustomButtonDirective } from './directives/custom-button.directive';
import { IfViewportDirective } from './directives/if-viewport.directive';
import { FormatTextPipe } from './pipes/format-text.pipe';
import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  JsonPipe,
  KeyValuePipe,
  LowerCasePipe,
  NgFor,
  PercentPipe,
  SlicePipe,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NewMediaCollectionComponent,
    CustomButtonDirective,
    IfViewportDirective,
    FormatTextPipe,
    TitleCasePipe,
    PercentPipe,
    DatePipe,
    CurrencyPipe,
    DecimalPipe,
    JsonPipe,
    SlicePipe,
    KeyValuePipe,
    NgFor,
    LowerCasePipe,
    UpperCasePipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'media-manager-ng';
  showComponent = true;
  prueba = 'valor inicial desde app component';

  public someText = 'this is a test';
  public currentDate = new Date();
  public currentTimeInMinutes = Date.now() / 1000 / 60;
  public discount = 0.205;
  public jsonObject = { foo: 'bar', baz: 'qux', nested: { xyz: 3, numbers: [1, 2, 3, 4, 5] } };
  public animals = ['pangolin', 'aardvark', 'echidna', 'binturong'];

  constructor() {
    setTimeout(() => {
      this.prueba = 'otro valor dinamico';
    }, 3000);
  }

  public toggleComponent() {
    this.showComponent = !this.showComponent;
  }

  public onCollectionReload(data: unknown) {
    console.log('AppComponent: Collection reload event received', data);
  }

  public onButtonHovered(isHovered: boolean) {
    console.log('button is hovered', isHovered);
  }

  public trackByFn(index: number, _item: unknown) {
    return index;
  }
}
