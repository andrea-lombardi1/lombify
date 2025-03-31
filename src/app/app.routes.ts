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
  },
  {
    path: 'album/:collectionId',
    loadComponent: () => import('./ui/pages/album/album.component').then(m => m.AlbumComponent),
  },
  {
    path: 'track/:trackId',
    loadComponent: () => import('./ui/pages/track/track.component').then(m => m.TrackComponent),
  },
  {
    path: 'collection',
    loadComponent: () => import('./ui/pages/collection/collection.component').then(m => m.CollectionComponent),
  },
  {
    path: '404',
    loadComponent: () => import('./ui/pages/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
