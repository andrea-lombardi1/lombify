import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SearchModel, WrapperType } from '../../model/search.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  readonly #http = inject(HttpClient);

  readonly #searchURL = '/search?country=it&media=music';
  readonly #lookupURL = '/lookup?sort=recent';
  readonly #tracksURL = '/tracks';


  constructor() {}

  search(query: string, entity: WrapperType | null) {
    let entityParam = '&entity=musicArtist,album,musicTrack';
    let attributeParam = '';
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
    const url = `${this.#searchURL}${entityParam}${attributeParam}&term=${query}`;

    return this.#http.get<SearchModel>(url)
    .pipe(
      // Sort by release date
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

  lookup(id: number, entity: WrapperType) {
    let entityParam = '&entity=musicArtist,album,musicTrack';
    if (entity === WrapperType.artist) {
      entityParam = '&entity=album';
    }
    if (entity === WrapperType.collection) {
      entityParam = '&entity=song';
    }
    const url = `${this.#lookupURL}${entityParam}&id=${id}`;

    return this.#http.get<SearchModel>(url);
  }

  lanTracks() {
    const url = `${this.#tracksURL}`;
    return this.#http.get<SearchModel>(url);
  }

  getTrackById(id: string) {
    const url = `${this.#tracksURL}/${id}`;
    return this.#http.get<SearchModel>(url);
  }
}
