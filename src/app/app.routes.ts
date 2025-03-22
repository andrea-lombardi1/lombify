import { Routes } from '@angular/router';
import { HomeComponent } from './ui/pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'artist/:artistId',
    loadComponent: () => import('./ui/pages/artist/artist.component').then(m => m.ArtistComponent),
    data: { breadcrumb: [{ label: 'Home', route: '/' }] },
  },
  {
    path: 'album/:collectionId',
    loadComponent: () => import('./ui/pages/album/album.component').then(m => m.AlbumComponent),
    data: { breadcrumb: [{ label: 'Home', route: '/' }] },
  },
  {
    path: 'track/:trackId',
    loadComponent: () => import('./ui/pages/track/track.component').then(m => m.TrackComponent),
    data: { breadcrumb: [{ label: 'Home', route: '/' }] },
  },
  {
    path: 'collection',
    loadComponent: () => import('./ui/pages/collection/collection.component').then(m => m.CollectionComponent),
    data: { breadcrumb: [{ label: 'Home', route: '/' },{ label: 'Preferiti' }] },
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
