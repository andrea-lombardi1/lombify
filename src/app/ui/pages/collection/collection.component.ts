import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CollectionService } from '../../../core/service/collection/collection.service';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ResultModel } from '../../../core/model/search.model';

@Component({
  selector: 'app-collection',
  imports: [NavbarComponent,
    TableModule,
    AvatarModule,
    ButtonModule
  ],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent implements OnInit {
  route = inject(ActivatedRoute);
  collectionService = inject(CollectionService);
  itemsBreadcrumb: MenuItem[] = [];
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.itemsBreadcrumb = data["breadcrumb"];
    });
  }

  removeFromFavorites(row: ResultModel) {
    this.collectionService.removeCollection(row);
  }
}
