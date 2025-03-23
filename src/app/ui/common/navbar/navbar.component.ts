import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SearchService } from '../../../core/service/search/search.service';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  imports: [BreadcrumbModule,
    RouterModule,
    FormsModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  @Input() items: MenuItem[] | undefined;
  readonly searchService = inject(SearchService);

  home: MenuItem | undefined;
  value: string | undefined;

  ngOnInit() {

    this.home = { routerLink: '/' };
  }

  searchContent() {
    console.log(this.value);
  }
}
