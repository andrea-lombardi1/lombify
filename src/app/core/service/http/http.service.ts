import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SearchModel, WrapperType } from '../../model/search.model';
import { map, Observable } from 'rxjs';
import { CollectionService } from '../collection/collection.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  http = inject(HttpClient);
  collection = inject(CollectionService);

  constructor() {}

  search(query: string, entity: WrapperType | null) {
    const baseUrl = 'https://itunes.apple.com/search?country=it&media=music';
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
    const url = `${baseUrl}${entityParam}&sort=recent${attributeParam}&term=${query}`;

    return this.http.get<SearchModel>(url)
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
    const baseUrl = `https://itunes.apple.com/lookup?id=${id}`;
    let entityParam = '&entity=musicArtist,album,musicTrack';
    if (entity === WrapperType.artist) {
      entityParam = '&entity=album';
    }
    if (entity === WrapperType.collection) {
      entityParam = '&entity=song';
    }
    const url = `${baseUrl}${entityParam}&sort=recent`;

    return this.http.get<SearchModel>(url);
  }
}
