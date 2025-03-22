import { Component, inject, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {
  httpService = inject(HttpService);
  playerService = inject(PlayerService);
  collectionService = inject(CollectionService);

  // The search query
  query: string = '';
  // The timeout for the search query (500ms)
  timeoutQuery: any;
  // The subscription to the search query
  subscription: any;
  // The results of the search
  data: SearchModel | null = null;
  // The options for the select filter
  stateOptions: any[] = [
    { label: 'Artista', value: WrapperType.artist },
    { label: 'Album', value: WrapperType.collection },
    { label: 'Canzone', value: WrapperType.track },
  ];

  value: WrapperType | null = null;

  ngOnInit() {}

  search() {
    this.data = null;
    clearTimeout(this.timeoutQuery);
    this.timeoutQuery = setTimeout(() => {
      console.log(this.query);
      if (this.query.length < 3) {
        return;
      }
      // Clear the subscription
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.subscription = this.httpService
        .search(this.query, this.value)
        .subscribe((data) => {
          this.data = data;
          console.log(this.data);
        });
    }, 500);
  }

  playSong(songUrl: string) {
    this.playerService.initializePlayer(songUrl);
    this.playerService.play();
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
