import { Injectable } from '@angular/core';
import { ResultModel } from '../../model/search.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  collection: ResultModel[] = [];
  constructor() { }
  addCollection(item: ResultModel) {
    this.collection.push(item);
    console.log(this.collection);

  }

  removeCollection(item: ResultModel) {
    this.collection = this.collection.filter((element) => element !== item);
  }

  getCollection() {
    return this.collection;
  }

  has(result: ResultModel): boolean {
    return this.collection.some(
      (element) =>
      element.trackId === result.trackId ||
      element.artistId === result.artistId ||
      element.collectionId === result.collectionId
    );
  }

}
