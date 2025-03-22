import { Component, inject, input, OnInit } from '@angular/core';
import { HttpService } from '../../../core/service/http/http.service';
import { WrapperType } from '../../../core/model/search.model';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-artist',
  imports: [NavbarComponent],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.css',
})
export class ArtistComponent implements OnInit {
  readonly artistId = input<number>();

  httpService = inject(HttpService);

  itemsBreadcrumb: MenuItem[] = [];

  ngOnInit() {
    this.httpService
      .lookup(this.artistId() ?? -1, WrapperType.artist)
      .subscribe((data) => {
        console.log(data);
        this.itemsBreadcrumb = [
          { label: 'Home', route: '/' },
          { label: data.results[0].artistName },
        ];

      });
  }
}
