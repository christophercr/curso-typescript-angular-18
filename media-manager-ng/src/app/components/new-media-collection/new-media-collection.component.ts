import type { OnChanges, SimpleChanges } from '@angular/core';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-media-collection',
  standalone: true,
  imports: [],
  templateUrl: './new-media-collection.component.html',
  styleUrl: './new-media-collection.component.css',
})
export class NewMediaCollectionComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input()
  public name = 'default value';

  @Output()
  public reloadClicked = new EventEmitter<string>();

  public ngOnInit() {
    console.log('ngOnInit called!');
  }

  public ngAfterViewInit(): void {
    console.log('ngAfterViewInit called!');
  }

  public ngOnChanges(changes: SimpleChanges): void {
     console.log('ngOnChanges called!', changes);
 }

  public ngOnDestroy() {
    console.log('ngOnDestroy called!');
  }

  public createBookCollection() {
    console.log('Creating a new book collection...');
  }

  public reloadBookCollections() {
    console.log('Reloading book collections...');
    this.reloadClicked.emit('some data');
  }
}
