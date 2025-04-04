import { map } from 'rxjs';
import { computed, inject, Injectable, signal } from '@angular/core';
import { ResultModel, SearchModel } from '../../model/search.model';
import { CollectionService } from '../collection/collection.service';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  readonly #httpService = inject(HttpService);
  readonly #collectionService = inject(CollectionService);

  readonly #data = signal<ResultModel[]>([]);
  readonly dataComp = computed(() => this.#data());
  readonly #loading = signal<boolean>(false);
  readonly loadingComp = computed(() => this.#loading());
  constructor() { }

  getTracks() {
    this.#data.update(() => []);
    this.#loading.update(() => true);
    this.#httpService.lanTracks().subscribe((response: SearchModel) => {
      const results = response.results.map((result) => {
        result.favorite = this.#collectionService.collection.some(
          (element) => {
            return element.trackId === result.trackId;
          }
        );
        return result;
      });
      this.#data.update(() => results);
      this.#loading.update(() => false);
    });
  }

  getTrackById(id: string) {
    return this.#httpService.getTrackById(id).pipe(
      map((response: SearchModel) => {
      const results = response.results.map((result) => ({
        ...result,
        favorite: this.#collectionService.collection.some(
          (element) => {
            return element.trackId === result.trackId;
          }
        )
      }));
      return {resultCount: response.resultCount, results};
    }));
  }
}
