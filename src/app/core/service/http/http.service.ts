import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SearchModel } from '../../model/search.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  http = inject(HttpClient);

  constructor() { }

  search(query: string, entity: string | null) {
    const url = entity
      ? `https://itunes.apple.com/search?media=music&entity=${entity}&term=${query}`
      : `https://itunes.apple.com/search?media=music&entity=musicArtist,album,musicTrack&term=${query}`;
    return this.http.get<SearchModel>(url);
  }
}
