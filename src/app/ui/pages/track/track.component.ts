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
import { CollectionService } from '../../../core/service/collection/collection.service';
import { LanService } from '../../../core/service/lan/lan.service';

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
  readonly trackId = input<number | string>();

  readonly collectionService = inject(CollectionService);
  readonly searchService = inject(SearchService);
  readonly lanService = inject(LanService);
  readonly playerService = inject(PlayerService);
  readonly router = inject(Router);

  itemsBreadcrumb: MenuItem[] = [];

  track: ResultModel | undefined;

  ngOnInit() {
    if (!isNaN(Number(this.trackId()))) {
    this.searchService
      .lookup(this.trackId() as number, WrapperType.track)
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
    } else {
      this.lanService.getTrackById(this.trackId() as string).subscribe({
        next: (data) => {
          if (data.resultCount === 0) {
        this.router.navigate(['/404']);
          }
          this.itemsBreadcrumb = [
        { label: 'Home', route: '/' },
        {
          label: 'LAN',
          route: `/lan`,
        },
        { label: data.results[0].trackName },
          ];
          this.track = data.results[0];
          this.playerService.initializePlayer(this.track);
        },
        error: (err) => {
          console.error('Error fetching track by ID:', err);
          this.router.navigate(['/404']);
        },
      });
    }
  }

  addToFavorites(row: ResultModel | undefined) {
    if (!row) return;
    row.favorite = true;
    this.collectionService.addToCollection(row);
  }

  removeFromFavorites(row: ResultModel | undefined) {
    if (!row) return;
    row.favorite = false;
    this.collectionService.removeFromCollection(row);
  }
}
