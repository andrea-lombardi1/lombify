import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SearchModel, WrapperType } from '../../model/search.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  // HttpClient
  readonly #http = inject(HttpClient);

  // URL per le chiamate API
  readonly #searchURL = '/search?country=it&media=music';
  readonly #lookupURL = '/lookup?sort=recent';
  readonly #tracksURL = '/tracks';
  readonly #uploadURL = '/upload';

  /**
   * Ricerca di un brano, album o artista
   * @param query la stringa da cercare
   * @param entity il tipo di entità da cercare (artista, album o brano)
   * @returns un Observable con i risultati della ricerca
   */
  search(query: string, entity: WrapperType | null) {
    // Se non viene passato un tipo di entità, cerco tutto
    let entityParam = '&entity=musicArtist,album,musicTrack';
    let attributeParam = '';
    // Se viene passato un tipo di entità, cerco solo quello
    if (entity === WrapperType.artist) {
      entityParam = '&entity=musicArtist';
      attributeParam = '&attribute=artistTerm';
    }
    if (entity === WrapperType.collection) {
      entityParam = '&entity=album';
      attributeParam = '&attribute=albumTerm';
    }
    if (entity === WrapperType.track) {
      entityParam = '&entity=musicTrack';
      attributeParam = '&attribute=songTerm';
    }
    // Preparo l'URL per la chiamata API
    const url = `${this.#searchURL}${entityParam}${attributeParam}&term=${query}`;

    return this.#http.get<SearchModel>(url)
    .pipe(
      // Ordino i risultati in base alla data di rilascio
      map((data) => ({
        resultCount: data.resultCount,
        results: data.results.sort(
          (a, b) =>
            new Date(b.releaseDate).getTime() -
            new Date(a.releaseDate).getTime()
        ),
      }))
    );
  }

  /**
   * Effettua una ricerca per ID
   * @param id l'ID dell'entità da cercare
   * @param entity il tipo di entità da cercare (artista, album o brano)
   * @returns un Observable con i risultati della ricerca
   */
  lookup(id: number, entity: WrapperType) {
    // Se non viene passato un tipo di entità, cerco tutto
    let entityParam = '&entity=musicArtist,album,musicTrack';
    // Se viene passato un tipo di entità, cerco solo quello
    if (entity === WrapperType.artist) {
      entityParam = '&entity=album';
    }
    if (entity === WrapperType.collection) {
      entityParam = '&entity=song';
    }
    // Preparo l'URL per la chiamata API
    const url = `${this.#lookupURL}${entityParam}&id=${id}`;

    return this.#http.get<SearchModel>(url)
    .pipe(
      map((data) => ({
      resultCount: data.resultCount,
      // Ordino i risultati in base alla data di rilascio
      // Se l'entità è un album, non ordino i risultati
      results: entity !== WrapperType.collection
        ? data.results.sort(
          (a, b) =>
          new Date(b.releaseDate).getTime() -
          new Date(a.releaseDate).getTime()
        )
        : data.results,
      }))
    );
  }

  /**
   * Aggiunge un brano alla libreria locale
   * @param formData il FormData contenente i dati del brano da aggiungere
   * @returns un Observable con i risultati dell'operazione
   */
  addTrack(formData: FormData) {
    // Preparo l'URL per la chiamata API
    const url = `${this.#uploadURL}`;
    return this.#http.post<SearchModel>(url, formData);
  }

  /**
   * Recupera i brani dalla libreria locale
   * @returns un Observable con i risultati della ricerca
   */
  lanTracks() {
    // Preparo l'URL per la chiamata API
    const url = `${this.#tracksURL}`;
    return this.#http.get<SearchModel>(url);
  }

  /**
   * Recupera un brano dalla libreria locale per ID
   * @param id l'ID del brano da recuperare
   * @returns un Observable con i risultati della ricerca
   */
  getTrackById(id: string) {
    // Preparo l'URL per la chiamata API
    const url = `${this.#tracksURL}/${id}`;
    return this.#http.get<SearchModel>(url);
  }
}
