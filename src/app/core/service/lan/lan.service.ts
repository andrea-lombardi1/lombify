import { map } from 'rxjs';
import { computed, inject, Injectable, signal } from '@angular/core';
import { ResultModel, SearchModel } from '../../model/search.model';
import { CollectionService } from '../collection/collection.service';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class LanService {
  // HttpService
  readonly #httpService = inject(HttpService);
  // CollectionService
  readonly #collectionService = inject(CollectionService);

  // Data signal
  readonly #data = signal<ResultModel[]>([]);
  // Data computed property
  readonly dataComp = computed(() => this.#data());
  // loading state: 0 = loading, 1 = loaded, -1 = error
  readonly #loading = signal<number>(0);
  readonly loadingComp = computed(() => this.#loading());

  /**
   * Aggiunge un brano alla libreria locale.
   * @param trackFile Audio del brano
   * @param trackName Nome del brano
   * @param artworkFile Copertina del brano
   * @param artistName Nome dell'artista
   * @returns Observable con la risposta del server
   */
  addTrack(trackFile: File, trackName: string, artworkFile: File | null, artistName: string) {
    // Preparo il FormData
    const formData = new FormData();
    // Aggiungo i file e i dati al FormData
    formData.append('trackFile', trackFile, trackFile.name);
    if (artworkFile) {
      formData.append('artworkFile', artworkFile, artworkFile.name);
    }
    formData.append('trackName', trackName);
    artistName ?? formData.append('artistName', artistName);

    return this.#httpService.addTrack(formData);
  }

  /**
   * Recupera i brani dalla libreria locale.
   * @returns Observable con la lista dei brani
   */
  getTracks() {
    // Resetto i dati e lo stato di caricamento
    this.#data.update(() => []);
    this.#loading.update(() => 1);
    this.#httpService.lanTracks().subscribe({
      next: (response: SearchModel) => {
        const results = response.results.map((result) => {
          // Aggiungo la proprietà favorite per ogni brano
          result.favorite = this.#collectionService.getCollection().some(
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

  /**
   * Recupera un brano dalla libreria locale.
   * @param id ID del brano
   * @returns Observable con il brano
   */
  getTrackById(id: string) {
    return this.#httpService.getTrackById(id).pipe(
      map((response: SearchModel) => {
      const results = response.results.map((result) => ({
        ...result,
        // Aggiungo la proprietà favorite per ogni brano
        favorite: this.#collectionService.getCollection().some(
          (element) => {
            return element.trackId === result.trackId;
          }
        )
      }));
      return {resultCount: response.resultCount, results};
    }));
  }
}
