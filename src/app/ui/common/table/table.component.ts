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
  readonly data = input.required<ResultModel[]>();
  readonly type = input.required<string>();

  addToFavorites(row: ResultModel) {
    row.favorite = true;
    this.collectionService.addCollection(row);
  }

  removeFromFavorites(row: ResultModel) {
    row.favorite = false;
    this.collectionService.removeCollection(row);
  }
}
