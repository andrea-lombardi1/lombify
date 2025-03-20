import { Injectable } from '@angular/core';
import { SearchModelAll } from '../../model/search.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  collection: SearchModelAll[] = [];
  constructor() { }
  addCollection(item: SearchModelAll) {
    this.collection.push(item);
    console.log(this.collection);

  }

  removeCollection(item: SearchModelAll) {
    this.collection = this.collection.filter((element) => element !== item);
  }

  getCollection() {
    return this.collection;
  }

  has(result: SearchModelAll): boolean {
    return this.collection.some(
      (element) =>
      element.trackId === result.trackId ||
      element.artistId === result.artistId ||
      element.collectionId === result.collectionId
    );
  }

}
