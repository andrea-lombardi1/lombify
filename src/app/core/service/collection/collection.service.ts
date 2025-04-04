import { inject, Injectable } from '@angular/core';
import { ResultModel } from '../../model/search.model';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  messageService = inject(MessageService);
  collection: ResultModel[] = JSON.parse(localStorage.getItem('collection') || '[]') || [];
  constructor() { }
  addCollection(item: ResultModel) {
    item.favorite = true;
    this.collection.push(item);
    localStorage.setItem('collection', JSON.stringify(this.collection));
    let summary = '';
    let detail = '';
    switch (item.wrapperType) {
      case 'artist':
        summary = item.artistName;
        detail = 'Artista aggiunto';
        break;
      case 'collection':
        summary = item.collectionName;
        detail = 'Album aggiunto';
        break;
      case 'track':
        summary = item.trackName;
        detail = 'Canzone aggiunta';
        break;
    }
    this.messageService.add({severity:'success', summary, detail: `${detail} ai preferiti`});
  }

  removeCollection(item: ResultModel) {
    console.log('collection', this.collection);

    let summary = '';
    let detail = '';
    switch (item.wrapperType) {
      case 'artist':
        this.collection = this.collection.filter((element) => element.wrapperType !== 'artist' || element.artistId !== item.artistId);
        summary = item.artistName;
        detail = 'Artista rimosso';
        break;
      case 'collection':
        this.collection = this.collection.filter((element) => (element.wrapperType != 'collection' || element.collectionId != item.collectionId));
        summary = item.collectionName;
        detail = 'Album rimosso';
        break;
      case 'track':
        this.collection = this.collection.filter((element) => (element.wrapperType != 'track' || element.trackId != item.trackId));
        summary = item.trackName;
        detail = 'Canzone rimossa';
        break;
    }
    console.log('collection', this.collection);
    localStorage.setItem('collection', JSON.stringify(this.collection));
    this.messageService.add({severity:'error', summary, detail: `${detail} dai preferiti`});
    item.favorite = false;
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
