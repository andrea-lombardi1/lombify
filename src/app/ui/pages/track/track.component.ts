import { Component, inject, input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ResultModel, WrapperType } from '../../../core/model/search.model';
import { HttpService } from '../../../core/service/http/http.service';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../../core/service/player/player.service';
import { FormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { Router } from '@angular/router';
import { SearchService } from '../../../core/service/search/search.service';

@Component({
  selector: 'app-track',
  imports: [
    NavbarComponent,
    PanelModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    ProgressBarModule,
  ],
  templateUrl: './track.component.html',
  styleUrl: './track.component.css',
})
export class TrackComponent implements OnInit {
  readonly trackId = input<number>();

  readonly searchService = inject(SearchService);
  readonly playerService = inject(PlayerService);
  readonly router = inject(Router);

  itemsBreadcrumb: MenuItem[] = [];

  track: ResultModel | undefined;

  ngOnInit() {
    this.searchService
      .lookup(this.trackId() ?? -1, WrapperType.track)
      .subscribe((data) => {
        if (data.resultCount === 0) {
          this.router.navigate(['/404']);
        }
        this.itemsBreadcrumb = [
          { label: 'Home', route: '/' },
          {
            label: data.results[0].artistName,
            route: `/artist/${data.results[0].artistId}`,
          },
          {
            label: data.results[0].collectionName,
            route: `/album/${data.results[0].collectionId}`,
          },
          { label: data.results[0].trackName },
        ];
        this.track = data.results[0];
        this.playerService.initializePlayer(this.track);
      });
  }
}
