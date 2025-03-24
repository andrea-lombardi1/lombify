import { Component, inject, input, OnInit } from '@angular/core';
import { HttpService } from '../../../core/service/http/http.service';
import { ResultModel, WrapperType } from '../../../core/model/search.model';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { MenuItem } from 'primeng/api';
import { TableComponent } from "../../common/table/table.component";
import { Router } from '@angular/router';
import { SearchService } from '../../../core/service/search/search.service';

@Component({
  selector: 'app-artist',
  imports: [NavbarComponent, TableComponent],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.css',
})
export class ArtistComponent implements OnInit {
  readonly artistId = input<number>();

  readonly searchService = inject(SearchService);
  readonly router = inject(Router);

  itemsBreadcrumb: MenuItem[] = [];

    artist : ResultModel | undefined;
    albums: ResultModel[] = [];

  ngOnInit() {
    this.searchService
      .lookup(this.artistId() ?? -1, WrapperType.artist)
      .subscribe((data) => {
        if (data.resultCount === 0) {
          this.router.navigate(['/404']);
        }
        this.itemsBreadcrumb = [
          { label: 'Home', route: '/' },
          { label: data.results[0].artistName },
        ];
        this.artist = data.results[0];
        this.albums = data.results.slice(1);
      });
  }
}
