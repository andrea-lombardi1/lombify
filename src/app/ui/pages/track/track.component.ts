import { Component, inject, input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ResultModel, WrapperType } from '../../../core/model/search.model';
import { HttpService } from '../../../core/service/http/http.service';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-track',
  imports: [NavbarComponent, PanelModule],
  templateUrl: './track.component.html',
  styleUrl: './track.component.css'
})
export class TrackComponent implements OnInit {
  readonly trackId = input<number>();

  httpService = inject(HttpService);

  itemsBreadcrumb: MenuItem[] = [];

  track : ResultModel | undefined;

  ngOnInit() {
    this.httpService
      .lookup(this.trackId() ?? -1, WrapperType.track)
      .subscribe((data) => {
        console.log(data);
        this.itemsBreadcrumb = [
          { label: 'Home', route: '/' },
          { label: data.results[0].artistName, route: `/artist/${data.results[0].artistId}` },
          { label: data.results[0].collectionName, route: `/album/${data.results[0].collectionId}` },
          { label: data.results[0].trackName },
        ];
        this.track = data.results[0];
      });
  }
}
