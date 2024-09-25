import {Expose, Type} from "class-transformer";
import {Media} from "./media";

export class MediaCollection<T extends Media> {
  private _identifier: string;
  private _name: string = "";
  private _collection: ReadonlyArray<T> = [];

  private readonly _type: Function;

  constructor(
    type: Function,
    name?: string,
    identifier?: string
  ) {
    this._type = type;

    if (name) {
      this._name = name;
    }

    if (identifier) {
      this._identifier = identifier;
    } else {
      // esto solo es un ejemplo, en un proyecto real es mejor utilizar UUIDs
      // https://www.npmjs.com/package/uuid
      this._identifier = Math.random().toString(36).substr(2, 9);
    }
  }

  @Expose()
  get identifier() {
    return this._identifier;
  }

  set identifier(identifier: string) {
    this._identifier = identifier;
  }

  @Expose()
  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  @Expose()
  @Type(options => {
    if (options) {
      return (options.newObject as MediaCollection<T>)._type;
    } else {
      throw new Error("Cannot not determine the type because the options object is null or undefined");
    }
  })
  //get collection() {
  get collection(): ReadonlyArray<T> {
    return this._collection;
  }

  set collection(collection: ReadonlyArray<T>) {
  // set collection(collection: T[]) {
    this._collection = collection;
  }

  addMedia(media: Readonly<T>) {
    if (media) {
      this._collection = this._collection.concat(media);
    }
  }

  removeMedia(itemId: string) {
    if (itemId) {
      this._collection = this._collection.filter(item => {
        return item.identifier !== itemId;
      });
    }
  }
}
