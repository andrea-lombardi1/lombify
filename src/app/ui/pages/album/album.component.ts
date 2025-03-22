import { Component, inject, input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ResultModel, WrapperType } from '../../../core/model/search.model';
import { HttpService } from '../../../core/service/http/http.service';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-album',
  imports: [NavbarComponent, PanelModule],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css'
})
export class AlbumComponent implements OnInit {
  readonly collectionId = input<number>();

  httpService = inject(HttpService);

  itemsBreadcrumb: MenuItem[] = [];

  collection : ResultModel | undefined;

  ngOnInit() {
    this.httpService
      .lookup(this.collectionId() ?? -1, WrapperType.collection)
      .subscribe((data) => {
        console.log(data);
        this.itemsBreadcrumb = [
          { label: 'Home', route: '/' },
          { label: data.results[0].artistName, route: `/artist/${data.results[0].artistId}` },
          { label: data.results[0].collectionName },
        ];
        this.collection = data.results[0];
      });
  }
}
