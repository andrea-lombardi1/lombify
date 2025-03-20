export interface SearchModel {
  resultCount: number;
  results: SearchModelAll[];
}

interface SearchModelArtist {
  wrapperType: string;
  artistType: string;
  artistName: string;
  artistLinkUrl: string;
  artistId: number;
  primaryGenreName?: string;
  primaryGenreId?: number;
  amgArtistId?: number;
}

export interface SearchModelAll {
  wrapperType: string;
  kind: string;
  amgArtistId: number;
  artistId: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  previewUrl: string;
  artworkUrl100: string;
  releaseDate: string;
}
