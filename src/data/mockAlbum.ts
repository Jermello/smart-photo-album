import { AlbumPage, Cluster, Photo } from '@/types/album';

// Generate consistent picsum URLs with portrait orientation
const createPhoto = (id: number, seed: number): Photo => ({
  id: `photo-${id}`,
  src: `https://picsum.photos/seed/${seed}/600/800`,
  width: 600,
  height: 800,
});

// Cover page
const coverPage: AlbumPage = {
  id: 'page-cover',
  layout: '1',
  photos: [createPhoto(0, 100)],
  clusterId: 'cluster-cover',
};

// Cluster 1: Summer Vacation (pages 1-3)
const summerPages: AlbumPage[] = [
  {
    id: 'page-1',
    layout: '2h',
    photos: [createPhoto(1, 201), createPhoto(2, 202)],
    clusterId: 'cluster-summer',
  },
  {
    id: 'page-2',
    layout: '3a',
    photos: [createPhoto(3, 203), createPhoto(4, 204), createPhoto(5, 205)],
    clusterId: 'cluster-summer',
  },
  {
    id: 'page-3',
    layout: '4',
    photos: [createPhoto(6, 206), createPhoto(7, 207), createPhoto(8, 208), createPhoto(9, 209)],
    clusterId: 'cluster-summer',
  },
];

// Cluster 2: City Walk (pages 4-5)
const cityPages: AlbumPage[] = [
  {
    id: 'page-4',
    layout: '3b',
    photos: [createPhoto(10, 310), createPhoto(11, 311), createPhoto(12, 312)],
    clusterId: 'cluster-city',
  },
  {
    id: 'page-5',
    layout: '2v',
    photos: [createPhoto(13, 313), createPhoto(14, 314)],
    clusterId: 'cluster-city',
  },
];

// Cluster 3: Nature (pages 6-7)
const naturePages: AlbumPage[] = [
  {
    id: 'page-6',
    layout: '1',
    photos: [createPhoto(15, 420)],
    clusterId: 'cluster-nature',
  },
  {
    id: 'page-7',
    layout: '4',
    photos: [createPhoto(16, 421), createPhoto(17, 422), createPhoto(18, 423), createPhoto(19, 424)],
    clusterId: 'cluster-nature',
  },
];

export const mockPages: AlbumPage[] = [
  coverPage,
  ...summerPages,
  ...cityPages,
  ...naturePages,
];

export const mockClusters: Cluster[] = [
  {
    id: 'cluster-cover',
    label: 'Cover',
    pageIds: ['page-cover'],
  },
  {
    id: 'cluster-summer',
    label: 'Summer Vacation',
    pageIds: ['page-1', 'page-2', 'page-3'],
  },
  {
    id: 'cluster-city',
    label: 'City Walk',
    pageIds: ['page-4', 'page-5'],
  },
  {
    id: 'cluster-nature',
    label: 'Nature',
    pageIds: ['page-6', 'page-7'],
  },
];

