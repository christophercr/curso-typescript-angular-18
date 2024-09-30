import { plainToClassFromExist } from 'class-transformer';
import { MediaCollection } from '../models/media-collection.model';
import type { Media } from '../models/media.model';
import type { MediaService, TypeOfChange } from '../models/media-service.model';
// import { MediaLocalStorageService } from './media-local-storage.service';
import { MediaHttpStorageService } from './media-http-storage.service';
import { inject } from '@angular/core';

export class MediaServiceImpl<T extends Media> implements MediaService<T> {
  private readonly _mediaStorageService = inject(MediaHttpStorageService);

  constructor(private _type: Function) {
    console.log(`Initializing media service for ${_type.name}`);
  }

  deserializeCollection = (serializedCollection: any): MediaCollection<T> => {
    return plainToClassFromExist<MediaCollection<T>, any>(new MediaCollection<T>(this._type), serializedCollection);
  };

  loadMediaCollection(identifier: string): Promise<MediaCollection<T>> {
    console.log(`Trying to load media collection with the following identifier: ${identifier}`);

    return this._mediaStorageService.getItem(identifier, this.deserializeCollection, this._type.name);
  }

  saveMediaCollection(
    collection: Readonly<MediaCollection<T>>,
    typeOfChange: TypeOfChange = 'create-collection',
    collectionItemOrId?: T | string,
    collectionId?: string,
  ) {
    if (!collection) {
      throw new Error('The list cannot be null or undefined!');
    }

    console.log(`Saving media collection with the following name ${collection.name}`);
    return this._mediaStorageService.saveItem(collection, this._type.name, typeOfChange, collectionItemOrId, collectionId);
  }

  getMediaCollectionIdentifiersList(): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      console.log('Retrieving the list of media collection identifiers');

      this._mediaStorageService
        .getAllItems(this.deserializeCollection, this._type.name)
        .then((collections) => {
          resolve(collections.map((collection) => collection.identifier));
        })
        .catch((err) => {
          reject(err); // dejar pasar el error
        });
    });
  }

  removeMediaCollection(identifier: string) {
    if (!identifier || '' === identifier.trim()) {
      throw new Error('The identifier must be provided!');
    }

    console.log(`Removing media collection with the following identifier ${identifier}`);

    return this._mediaStorageService.deleteItem(identifier, this._type.name);
  }

  displayErrorMessage(errorMessage: string) {
    if (!errorMessage) {
      throw new Error('An error message must be provided!');
    }
    alert(errorMessage); // mala experiencia de usuario, pero ignoremos esto por ahora
  }
}
