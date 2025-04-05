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
  // loading state: 0 = loading, 1 = loaded, -1 = error
  readonly #loading = signal<number>(0);
  readonly loadingComp = computed(() => this.#loading());
  constructor() { }

  addTrack(trackFile: File, trackName: string, artistFile: File, artistName: string) {
    const formData = new FormData();
    formData.append('trackFile', trackFile, trackFile.name);
    formData.append('artistFile', artistFile, artistFile.name);
    formData.append('trackName', trackName);
    formData.append('artistName', artistName);

    return this.#httpService.addTrack(formData);
  }

  getTracks() {
    this.#data.update(() => []);
    this.#loading.update(() => 1);
    this.#httpService.lanTracks().subscribe({
      next: (response: SearchModel) => {
        const results = response.results.map((result) => {
          result.favorite = this.#collectionService.collection.some(
            (element) => {
              return element.trackId === result.trackId;
            }
          );
          return result;
        });
        this.#data.update(() => results);
      },
      error: () => {
        this.#loading.update(() => -1);
      },
      complete: () => {
        this.#loading.update(() => 0);
      }
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
