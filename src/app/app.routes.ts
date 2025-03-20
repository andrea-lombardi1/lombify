import { Routes } from '@angular/router';
import { HomeComponent } from './ui/pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'collection',
    loadComponent: () => import('./ui/pages/collection/collection.component').then(m => m.CollectionComponent),
    data: { breadcrumb: [{ label: 'Home', route: '/' },{ label: 'Preferiti' }] },
  },
];
