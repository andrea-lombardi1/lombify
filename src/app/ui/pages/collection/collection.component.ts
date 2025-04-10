import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CollectionService } from '../../../core/service/collection/collection.service';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ResultModel } from '../../../core/model/search.model';
import { PlayerService } from '../../../core/service/player/player.service';
import { TableComponent } from "../../common/table/table.component";
import { HeroComponent } from "../../common/hero/hero.component";

@Component({
  selector: 'app-collection',
  imports: [NavbarComponent,
    TableModule,
    AvatarModule,
    ButtonModule,
    RouterModule, TableComponent, HeroComponent],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent implements OnInit {
  collectionService = inject(CollectionService);
  itemsBreadcrumb: MenuItem[] = [];
  ngOnInit() {
    this.itemsBreadcrumb = [
      { label: 'Home', route: '/' },
      { label: 'Preferiti' },
    ];
  }

  removeFromFavorites(row: ResultModel) {
    this.collectionService.removeFromCollection(row);
  }
}
