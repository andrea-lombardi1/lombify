import { Component, inject } from '@angular/core';
import { HttpService } from './../../../core/service/http/http.service';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { SpinnerComponent } from '../../common/spinner/spinner.component';
import { ResultModel, SearchModel, WrapperType } from '../../../core/model/search.model';
import { PlayerService } from '../../../core/service/player/player.service';
import { RouterModule } from '@angular/router';
import { CollectionService } from '../../../core/service/collection/collection.service';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../../core/service/search/search.service';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    ToolbarModule,
    AvatarModule,
    AvatarGroupModule,
    SelectModule,
    SpinnerComponent,
    TableModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  httpService = inject(HttpService);
  playerService = inject(PlayerService);
  collectionService = inject(CollectionService);
  readonly searchService = inject(SearchService);

  value: WrapperType | null = null;

  playSong(song: ResultModel) {
    this.playerService.initializePlayer(song);
    // setTimeout(() => {
    //   this.playerService.pause();
    // }, 3000);
    // setTimeout(() => {
    //   this.playerService.play();
    // }, 6000);
  }

  addToFavorites(row: ResultModel) {
    this.collectionService.addCollection(row);
  }
}
