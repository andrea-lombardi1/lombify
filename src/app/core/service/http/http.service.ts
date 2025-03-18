import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  http = inject(HttpClient);

  constructor() { }

  search(query: string) {
    return this.http.get(`https://itunes.apple.com/search?media=music&entity=musicArtist&term=${query}`);
  }
}
