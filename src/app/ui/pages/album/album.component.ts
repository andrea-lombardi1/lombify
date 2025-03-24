import { Component, inject, input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ResultModel, WrapperType } from '../../../core/model/search.model';
import { HttpService } from '../../../core/service/http/http.service';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { PanelModule } from 'primeng/panel';
import { TableComponent } from "../../common/table/table.component";
import { Router } from '@angular/router';
import { SearchService } from '../../../core/service/search/search.service';

@Component({
  selector: 'app-album',
  imports: [NavbarComponent, PanelModule, TableComponent],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css'
})
export class AlbumComponent implements OnInit {
  readonly collectionId = input<number>();

  readonly searchService = inject(SearchService);
  readonly router = inject(Router);

  itemsBreadcrumb: MenuItem[] = [];

  collection : ResultModel | undefined;
  tracks: ResultModel[] = [];

  ngOnInit() {
    this.searchService
      .lookup(this.collectionId() ?? -1, WrapperType.collection)
      .subscribe((data) => {
        if (data.resultCount === 0) {
          this.router.navigate(['/404']);
        }
        this.itemsBreadcrumb = [
          { label: 'Home', route: '/' },
          { label: data.results[0].artistName, route: `/artist/${data.results[0].artistId}` },
          { label: data.results[0].collectionName },
        ];
        this.collection = data.results[0];
        this.tracks = data.results.slice(1);
      });
  }
}
