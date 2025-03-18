import { Component, inject, OnInit } from '@angular/core';
import { HttpService } from './../../../core/service/http/http.service';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { SpinnerComponent } from '../../common/spinner/spinner.component';
import { SearchModel } from '../../../core/model/search.model';

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
    SelectButtonModule,
    SpinnerComponent,
    TableModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  query: string = '';
  httpService = inject(HttpService);
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
}
