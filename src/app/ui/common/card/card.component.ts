import { Component, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ResultModel } from '../../../core/model/search.model';
import { PlayerService } from '../../../core/service/player/player.service';
import { CollectionService } from '../../../core/service/collection/collection.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [ButtonModule, RouterModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  readonly elements = input.required<ResultModel[]>();
  readonly playerService = inject(PlayerService);
  readonly collectionService = inject(CollectionService);

  addToFavorites(row: ResultModel) {
    row.favorite = true;
    this.collectionService.addCollection(row);
  }

  removeFromFavorites(row: ResultModel) {
    row.favorite = false;
    this.collectionService.removeCollection(row);
  }
}
