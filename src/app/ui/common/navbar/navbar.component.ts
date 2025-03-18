import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';

@Component({
  selector: 'app-navbar',
  imports: [Breadcrumb],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  home: MenuItem | undefined;
  value: string | undefined;

  ngOnInit() {
    this.items = [{ label: 'Artista' }, { label: 'Jason Derulo' }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  searchContent() {
    console.log(this.value);
  }
}
