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
    this.collection = this.collection.filter((element) => element != item);
    localStorage.setItem('collection', JSON.stringify(this.collection));
    let summary = '';
    let detail = '';
    switch (item.wrapperType) {
      case 'artist':
        summary = item.artistName;
        detail = 'Artista rimosso';
        break;
      case 'collection':
        summary = item.collectionName;
        detail = 'Album rimosso';
        break;
      case 'track':
        summary = item.trackName;
        detail = 'Canzone rimossa';
        break;
    }
    this.messageService.add({severity:'error', summary, detail: `${detail} dai preferiti`});
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
