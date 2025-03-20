import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';

@Component({
  selector: 'app-navbar',
  imports: [Breadcrumb,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  @Input() items: MenuItem[] | undefined;

  home: MenuItem | undefined;
  value: string | undefined;

  ngOnInit() {

    this.home = { routerLink: '/' };
  }

  searchContent() {
    console.log(this.value);
  }
}
