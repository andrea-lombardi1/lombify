export interface SearchModel {
  resultCount: number;
  results: ResultModel[];
}

export interface ResultModel {
  artistId: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  artworkUrl100: string;
  releaseDate: string;
  wrapperType: string;
  previewUrl: string;
}

export enum WrapperType {
  artist = 'artist',
  collection = 'collection',
  track = 'track'
}

export interface ArtistDto {
  artistId: number;
  artistName: string;
}

export interface AlbumDto {
  collectionId: number;
  collectionName: string;
  releaseDate: string;
  artworkUrl100: string;
}

export interface TrackDto {
  trackId: number;
  trackName: string;
  artistName: string;
  releaseDate: string;
  artworkUrl100: string;
}

export interface Artist {
  artistId: number;
  artistName: string;
  primaryGenreName: string;
  amgArtistId: number;
}

export interface Album {
  collectionId: number;
  collectionName: string;
  artistId: number;
  artistName: string;
  releaseDate: string;
  artworkUrl100: string;
  primaryGenreName: string;
  collectionPrice: number;
  collectionExplicitness: string;
  trackCount: number;
  copyright: string;
  country: string;
  currency: string;
  favorite: boolean;
}

export interface Track {
  trackId: number;
  trackName: string;
  artistId: number;
  artistName: string;
  collectionId: number;
  collectionName: string;
  releaseDate: string;
  artworkUrl100: string;
  primaryGenreName: string;
  trackPrice: number;
  trackExplicitness: string;
  trackTimeMillis: number;
  trackNumber: number;
  trackCount: number;
  discNumber: number;
  discCount: number;
  previewUrl: string;
  favorite: boolean;
}
