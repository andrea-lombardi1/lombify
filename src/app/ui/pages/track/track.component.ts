import { Component, inject, input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { WrapperType } from '../../../core/model/search.model';
import { HttpService } from '../../../core/service/http/http.service';
import { NavbarComponent } from "../../common/navbar/navbar.component";

@Component({
  selector: 'app-track',
  imports: [NavbarComponent],
  templateUrl: './track.component.html',
  styleUrl: './track.component.css'
})
export class TrackComponent implements OnInit {
  readonly trackId = input<number>();

  httpService = inject(HttpService);

  itemsBreadcrumb: MenuItem[] = [];

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

      });
  }
}
