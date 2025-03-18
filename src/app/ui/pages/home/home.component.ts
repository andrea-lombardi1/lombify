import { Component, inject, OnInit } from '@angular/core';
import { HttpService } from './../../../core/service/http/http.service';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    ToolbarModule,
    AvatarModule,
    SelectButtonModule,
    MessageModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  query: string = '';
  httpService = inject(HttpService);
  timeoutQuery: any;
  results: any;
  stateOptions: any[] = [{ label: 'Artista', value: 'musicArtist' },{ label: 'Album', value: 'album' }, { label: 'Canzone', value: 'musicTrack' }];

  value: string | null = null;
  data: string[] = [];

  ngOnInit() {

  }

  search() {
    clearTimeout(this.timeoutQuery);
    this.timeoutQuery = setTimeout(() => {
      console.log(this.query);
      this.httpService.search(this.query).subscribe((data) => {
        this.results = data;
        console.log(this.results);
      }
      );
    }, 500);
  }
}
