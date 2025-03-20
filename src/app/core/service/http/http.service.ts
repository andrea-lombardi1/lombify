import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SearchModel } from '../../model/search.model';
import { map } from 'rxjs';
import { CollectionService } from '../collection/collection.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  http = inject(HttpClient);
  collection = inject(CollectionService);

  constructor() { }

  search(query: string, entity: string | null) {
    const baseUrl = 'https://itunes.apple.com/search?country=it&media=music';
    const entityParam = entity ? `&entity=${entity}` : '&entity=musicArtist,album,musicTrack';
    const attributeParam = entity === 'musicTrack'
      ? '&attribute=songTerm'
      : entity === 'album'
      ? '&attribute=albumTerm'
      : entity === 'musicArtist'
      ? '&attribute=artistTerm'
      : '';
    const url = `${baseUrl}${entityParam}&term=${query}&limit=200${attributeParam}`;

    return this.http.get<SearchModel>(url).pipe(
      map(response => ({
      ...response,
      results: response.results
        .filter(result => entity !== 'musicArtist' || result.amgArtistId)
        .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
        .map(result => ({
        ...result,
        favorite: this.collection.has(result)
        }))
      }))
    );
  }
}
