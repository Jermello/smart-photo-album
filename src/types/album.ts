export type LayoutType = '1' | '2h' | '2v' | '3a' | '3b' | '4';

export interface Photo {
  id: string;
  src: string;
  width: number;
  height: number;
}

export interface AlbumPage {
  id: string;
  layout: LayoutType;
  photos: Photo[];
  clusterId: string;
}

export interface Cluster {
  id: string;
  label: string;
  pageIds: string[];
}

export interface AlbumState {
  pages: AlbumPage[];
  clusters: Cluster[];
  currentPageIndex: number;
}
