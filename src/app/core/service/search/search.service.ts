import { map } from 'rxjs';
import {
  ResultModel,
  SearchModel,
  WrapperType,
} from '../../model/search.model';
import { CollectionService } from '../collection/collection.service';
import { HttpService } from './../http/http.service';
import { computed, inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  readonly #httpService = inject(HttpService);
  readonly #collectionService = inject(CollectionService);

  query = '';
  entity: WrapperType | null = null;
  readonly stateOptions: any[] = [
    { label: 'Artista', value: WrapperType.artist },
    { label: 'Album', value: WrapperType.collection },
    { label: 'Canzone', value: WrapperType.track },
  ];

  readonly #data = signal<ResultModel[]>([]);
  readonly dataComp = computed(() => this.#data());
  readonly #loading = signal<boolean>(false);
  readonly loadingComp = computed(() => this.#loading());

  #timeoutQuery: ReturnType<typeof setTimeout> | undefined;
  #subscription: any;

  constructor() {}

  private isFavorite(result: ResultModel): boolean {
    return this.#collectionService.collection.some((element) => {
      switch (result.wrapperType) {
        case 'artist':
          return element.wrapperType === result.wrapperType && element.artistId === result.artistId;
        case 'collection':
          return element.wrapperType === result.wrapperType && element.collectionId === result.collectionId;
        case 'track':
          return element.wrapperType === result.wrapperType && element.trackId === result.trackId;
        default:
          return false;
      }
    });
  }

  search() {
    this.#data.update(() => []);
    this.#loading.update(() => true);
    clearTimeout(this.#timeoutQuery);
    this.#timeoutQuery = setTimeout(() => {
      if (this.query.length < 3) {
        this.#loading.update(() => false);
        return;
      }
      if (this.#subscription) {
        this.#subscription.unsubscribe();
      }
      this.#subscription = this.#httpService
        .search(this.query, this.entity)
        .subscribe((response: SearchModel) => {
          const results = response.results.map((result) => {
            result.favorite = this.isFavorite(result);
            return result;
          });
          this.#data.update(() => results);
          this.#loading.update(() => false);
        });
    }, 500);
  }

  lookup(id: number, wrapperType: WrapperType) {
    return this.#httpService.lookup(id, wrapperType).pipe(
      map((response: SearchModel) => {
        const results = response.results.map((result) => ({
          ...result,
          favorite: this.isFavorite(result),
        }));
        return { resultCount: response.resultCount, results };
      })
    );
  }
}
