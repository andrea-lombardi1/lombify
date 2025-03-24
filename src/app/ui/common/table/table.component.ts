import { CommonModule } from '@angular/common';
import { Component, inject, input, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ResultModel, TableType } from '../../../core/model/search.model';
import { CollectionService } from '../../../core/service/collection/collection.service';
import { PlayerService } from '../../../core/service/player/player.service';

@Component({
  selector: 'app-table',
  imports: [TableModule, AvatarModule, ButtonModule, RouterModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  collectionService = inject(CollectionService);
  playerService = inject(PlayerService);
  @Input() data: any[] = [];
  readonly type = input.required<string>();

  addToFavorites(row: ResultModel) {
    this.collectionService.addCollection(row);
    row.favorite = true;
  }

  removeFromFavorites(row: ResultModel) {
    this.collectionService.removeCollection(row);
    row.favorite = false;
  }

  playSong(song: ResultModel) {
    this.playerService.initializePlayer(song);
    const playSongInteval = setInterval(() => {
      if (this.playerService.playerComp()) {
        if (this.playerService.playerComp()!.paused) {
          this.playerService.play();
        }
        clearInterval(playSongInteval);
      }
    }, 10);

  }
}
