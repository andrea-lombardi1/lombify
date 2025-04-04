import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { MenuItem } from 'primeng/api';
import { LocalService } from '../../../core/service/local/local.service';
import { HeroComponent } from "../../common/hero/hero.component";
import { TableComponent } from "../../common/table/table.component";

@Component({
  selector: 'app-local',
  imports: [NavbarComponent, HeroComponent, TableComponent],
  templateUrl: './local.component.html',
  styleUrl: './local.component.css'
})
export class LocalComponent implements OnInit {
  localService = inject(LocalService);
  itemsBreadcrumb: MenuItem[] = [];
  ngOnInit() {
    if (this.localService.dataComp().length === 0) {
      this.localService.getTracks();
    }
    this.itemsBreadcrumb = [
      { label: 'Home', route: '/' },
      { label: 'LAN' }
    ];
  }
}
