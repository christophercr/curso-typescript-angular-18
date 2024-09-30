import { Injectable } from '@angular/core';
import type { Media } from '../models/media.model';
import type { MediaCollection } from '../models/media-collection.model';
import { instanceToPlain } from 'class-transformer';
import type { DeserializationFn, MediaStorageService, TypeOfChange } from '../models/media-service.model';
import localForage from 'localforage';

@Injectable({
  providedIn: 'root',
})
export class MediaLocalStorageService implements MediaStorageService {
  // Map que contiene los almacenes de datos de localForage para cada tipo de objeto
  private readonly _stores = new Map<string, LocalForage>();

  constructor() {
    console.log(`Initializing media local storage service`);
  }

  saveItem<T extends Media>(
    collection: Readonly<MediaCollection<T>>,
    mediaType: string,
    typeOfChange?: TypeOfChange,
    collectionItemOrId?: T | string,
    collectionId?: string,
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const serializedVersion = instanceToPlain(collection, { excludePrefixes: ['_'] });
      console.log('Serialized version: ', serializedVersion);

      const store = this._getStore(mediaType);

      store
        .setItem(collection.identifier, serializedVersion)
        .then((value) => {
          console.log(`Saved the ${collection.name} collection successfully! Saved value: `, value);
          resolve();
        })
        .catch((err) => {
          console.error(`Failed to save the ${collection.name} collection with identifier ${collection.identifier}. Error: ${err}`);
          reject(err);
        });
    });
  }

  getItem<T extends Media>(identifier: string, deserializerFn: DeserializationFn<T>, mediaType: string): Promise<MediaCollection<T>> {
    return new Promise<MediaCollection<T>>((resolve, reject) => {
      const store = this._getStore(mediaType);
      store
        .getItem<any>(identifier)
        .then((value) => {
          console.log('Found the collection: ', value);

          const retrievedCollection = deserializerFn(value);

          console.log('Retrieved collection: ', retrievedCollection);
          resolve(retrievedCollection);
        })
        .catch((err) => {
          reject(err); // dejar pasar el error
        });
    });
  }

  getAllItems<T extends Media>(deserializerFn: DeserializationFn<T>, mediaType: string): Promise<MediaCollection<T>[]> {
    return new Promise<MediaCollection<T>[]>((resolve, reject) => {
      let accumulator: MediaCollection<T>[] = [];
      const store = this._getStore(mediaType);
      return store
        .iterate((value: string, key) => {
          const retrievedCollection = deserializerFn(value);
          accumulator.push(retrievedCollection);
        })
        .then(function () {
          resolve(accumulator);
        })
        .catch((err) => {
          console.error('Failed to retrieve the list of media collections. Error: ', err);
          reject(err);
        });
    });
  }

  deleteItem(identifier: string, mediaType: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const store = this._getStore(mediaType);
      store
        .removeItem(identifier)
        .then(() => {
          console.log(`Removed the ${identifier} collection successfully!`);
          resolve();
        })
        .catch((err) => {
          console.error(`Failed to removed the ${identifier} collection`);
          reject(err);
        });
    });
  }

  private _getStore(type: string): LocalForage {
    if (!this._stores.has(type)) {
      // cada tipo de Media tiene su propio almacén de datos: https://github.com/localForage/localForage
      // las opciones de inicialización se describen aquí: https://localforage.github.io/localForage/#settings-api-config
      this._stores.set(
        type,
        localForage.createInstance({
          name: 'mediaManager',
          version: 1.0,
          storeName: `media-man-${type}`, // añadimos el nombre del tipo al nombre del almacén de objetos
          description: 'MediaManager data store',
        }),
      );
    }

    return this._stores.get(type) as LocalForage;
  }
}
