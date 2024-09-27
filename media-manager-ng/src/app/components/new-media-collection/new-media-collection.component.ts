import type { OnChanges, SimpleChanges } from '@angular/core';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {FormatTextPipe} from "../../pipes/format-text.pipe";

@Component({
  selector: 'app-new-media-collection',
  standalone: true,
  imports: [FormsModule, FormatTextPipe],
  templateUrl: './new-media-collection.component.html',
  styleUrl: './new-media-collection.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewMediaCollectionComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input()
  public inputName = 'default value';

  @Output()
  public reloadClicked = new EventEmitter<string>();

  /*@ViewChild('nameInput')
  public nameInput: ElementRef<HTMLInputElement> | null = null;*/

  private _cdRef = inject(ChangeDetectorRef);

  public ngOnInit() {
    //console.log('ngOnInit called!');
  }

  public ngAfterViewInit(): void {
    //console.log('ngAfterViewInit called!');

    /*if (this.nameInput) {
      this.nameInput.nativeElement.value = this.name;
    }*/
  }

  public ngOnChanges(changes: SimpleChanges): void {
    //console.log('ngOnChanges called!', changes);
  }

  public ngOnDestroy() {
    //console.log('ngOnDestroy called!');
  }

  public createBookCollection() {
    //console.log('Creating a new book collection...');
  }

  public reloadBookCollections() {
    console.log('Reloading book collections...');
    this.reloadClicked.emit('some data');
    this._resetInput();
  }

  /*public onNameChange(newValue: string) {
    this.inputName = newValue;
    console.log('Name changed:', this.inputName);
  }*/

    private _resetInput() {
      console.log('Resetting the form...');
      setTimeout(() => {
        console.log('X secs delay...');
        this.inputName = 'default value';
        this._cdRef.markForCheck();
      }, 2000);
     }

}
