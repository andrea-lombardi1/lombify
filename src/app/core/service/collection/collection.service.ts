import { inject, Injectable } from '@angular/core';
import { ResultModel } from '../../model/search.model';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  // MessageService
  readonly #messageService = inject(MessageService);
  // Array di preferiti
  #collection: ResultModel[] = JSON.parse(localStorage.getItem('collection') || '[]') || [];

  /**
   * Aggiunge un elemento alla collezione dei preferiti
   * @param item Elemento da aggiungere all'array di preferiti
   */
  addToCollection(item: ResultModel) {
    // Aggiungo la riga ai preferiti
    item.favorite = true;
    // Aggiungo l'elemento all'array di preferiti
    this.#collection.push(item);
    // Aggiorno l'array di preferiti nel localStorage
    localStorage.setItem('collection', JSON.stringify(this.#collection));
    // Preparo il messaggio da inviare
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
    // Invio il messaggio
    this.#messageService.add({severity:'success', summary, detail: `${detail} ai preferiti`});
  }

  /**
   * Rimuove un elemento dalla collezione dei preferiti
   * @param item Elemento da rimuovere dall'array di preferiti
   */
  removeFromCollection(item: ResultModel) {
    // Preparo il messaggio da inviare
    let summary = '';
    let detail = '';
    switch (item.wrapperType) {
      case 'artist':
        // Rimuovo l'artista dall'array di preferiti
        this.#collection = this.#collection.filter((element) => element.wrapperType !== 'artist' || element.artistId !== item.artistId);
        summary = item.artistName;
        detail = 'Artista rimosso';
        break;
      case 'collection':
        // Rimuovo l'album dall'array di preferiti
        this.#collection = this.#collection.filter((element) => (element.wrapperType != 'collection' || element.collectionId != item.collectionId));
        summary = item.collectionName;
        detail = 'Album rimosso';
        break;
      case 'track':
        // Rimuovo la canzone dall'array di preferiti
        this.#collection = this.#collection.filter((element) => (element.wrapperType != 'track' || element.trackId != item.trackId));
        summary = item.trackName;
        detail = 'Canzone rimossa';
        break;
    }
    // Aggiorno l'array di preferiti nel localStorage
    localStorage.setItem('collection', JSON.stringify(this.#collection));
    // Invio il messaggio
    this.#messageService.add({severity:'error', summary, detail: `${detail} dai preferiti`});
    // Rimuovo la riga dai preferiti
    item.favorite = false;
  }

  /**
   * Restituisce l'array di preferiti
   * @returns Array di preferiti
   */
  getCollection() {
    return this.#collection;
  }

}
