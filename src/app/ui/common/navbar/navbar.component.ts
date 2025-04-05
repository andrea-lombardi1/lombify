import { Component, inject, input, Input, OnInit, output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SearchService } from '../../../core/service/search/search.service';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { LanService } from '../../../core/service/lan/lan.service';

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
  readonly isLanPage = input<boolean>(false);
  openDialog = output<void>();
  refresh = output<void>();
  @Input() items: MenuItem[] | undefined;
  readonly searchService = inject(SearchService);
  readonly router = inject(Router);

  home: MenuItem | undefined;
  value: string | undefined;

  ngOnInit() {
    this.home = { routerLink: '/' };
  }
}
