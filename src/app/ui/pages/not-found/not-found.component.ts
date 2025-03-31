import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { MenuItem } from 'primeng/api';
import { HeroComponent } from "../../common/hero/hero.component";

@Component({
  selector: 'app-not-found',
  imports: [NavbarComponent, HeroComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements OnInit {
  itemsBreadcrumb: MenuItem[] = [];
  ngOnInit() {
    this.itemsBreadcrumb = [
      { label: 'Home', route: '/' },
      { label: '404' },
    ];
  }
}
