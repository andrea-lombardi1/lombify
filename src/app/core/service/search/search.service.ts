import {
  ResultModel,
  SearchModel,
  WrapperType,
} from '../../model/search.model';
import { HttpService } from './../http/http.service';
import { computed, inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  readonly #httpService = inject(HttpService);

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
          this.#data.update(() => response.results);
          this.#loading.update(() => false);
        });
    }, 500);
  }
}
