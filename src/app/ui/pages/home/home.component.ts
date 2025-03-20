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
import { SearchModel } from '../../../core/model/search.model';
import { PlayerService } from '../../../core/service/player/player.service';

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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  query: string = '';
  httpService = inject(HttpService);
  playerService = inject(PlayerService);
  timeoutQuery: any;
  results: SearchModel | null = null;
  stateOptions: any[] = [
    { label: 'Artista', value: 'musicArtist' },
    { label: 'Album', value: 'album' },
    { label: 'Canzone', value: 'musicTrack' },
  ];

  value: string | null = null;
  data: string[] = [];

  ngOnInit() {}

  search() {
    this.results = null;
    clearTimeout(this.timeoutQuery);
    this.timeoutQuery = setTimeout(() => {
      console.log(this.query);
      if (this.query.length < 3) {
        return;
      }
      this.httpService.search(this.query, this.value).subscribe((data) => {
        this.results = data;
        console.log(this.results);
      });
    }, 500);
  }

  playSong(songUrl: string) {
    this.playerService.initializePlayer(songUrl);
    this.playerService.play();
  }
}
