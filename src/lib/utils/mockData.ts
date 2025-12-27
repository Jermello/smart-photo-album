import type { Album, AlbumPage, Photo } from "@/types/album";

/**
 * Generate mock photos using picsum.photos
 * All photos are portrait-oriented (3:4 ratio)
 */
function generateMockPhotos(count: number): Photo[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `photo-${i}`,
    src: `https://picsum.photos/seed/album-${i}/400/533`, // 3:4 portrait ratio
    alt: `Photo ${i + 1}`,
  }));
}

/**
 * Generate a mock album with realistic pages and clusters
 */
export function generateMockAlbum(): Album {
  const allPhotos = generateMockPhotos(24); // Enough for multiple pages
  let photoIndex = 0;

  const pages: AlbumPage[] = [];

  // Cover page (single photo)
  pages.push({
    id: "page-0",
    pageNumber: 0,
    layout: "single",
    photos: [allPhotos[photoIndex++]],
  });

  // Page 1: 2 photos horizontal
  pages.push({
    id: "page-1",
    pageNumber: 1,
    layout: "split-horizontal",
    photos: [allPhotos[photoIndex++], allPhotos[photoIndex++]],
    clusterId: "cluster-1",
  });

  // Page 2: 3 photos (2 top + 1 bottom)
  pages.push({
    id: "page-2",
    pageNumber: 2,
    layout: "three-top",
    photos: [
      allPhotos[photoIndex++],
      allPhotos[photoIndex++],
      allPhotos[photoIndex++],
    ],
    clusterId: "cluster-1",
  });

  // Page 3: 4 photos grid
  pages.push({
    id: "page-3",
    pageNumber: 3,
    layout: "grid-2x2",
    photos: [
      allPhotos[photoIndex++],
      allPhotos[photoIndex++],
      allPhotos[photoIndex++],
      allPhotos[photoIndex++],
    ],
    clusterId: "cluster-2",
  });

  // Page 4: 2 photos vertical
  pages.push({
    id: "page-4",
    pageNumber: 4,
    layout: "split-vertical",
    photos: [allPhotos[photoIndex++], allPhotos[photoIndex++]],
    clusterId: "cluster-2",
  });

  // Page 5: 3 photos (2 left + 1 right)
  pages.push({
    id: "page-5",
    pageNumber: 5,
    layout: "three-side",
    photos: [
      allPhotos[photoIndex++],
      allPhotos[photoIndex++],
      allPhotos[photoIndex++],
    ],
    clusterId: "cluster-3",
  });

  // Page 6: Single photo
  pages.push({
    id: "page-6",
    pageNumber: 6,
    layout: "single",
    photos: [allPhotos[photoIndex++]],
    clusterId: "cluster-3",
  });

  // Page 7: 4 photos grid
  pages.push({
    id: "page-7",
    pageNumber: 7,
    layout: "grid-2x2",
    photos: [
      allPhotos[photoIndex++],
      allPhotos[photoIndex++],
      allPhotos[photoIndex++],
      allPhotos[photoIndex++],
    ],
    clusterId: "cluster-4",
  });

  return {
    id: "mock-album",
    pages,
    coverPage: pages[0],
  };
}

/**
 * Group pages by cluster for sidebar display
 */
export function groupPagesByCluster(
  pages: AlbumPage[]
): Map<string | undefined, AlbumPage[]> {
  const groups = new Map<string | undefined, AlbumPage[]>();

  for (const page of pages) {
    const clusterId = page.clusterId;
    if (!groups.has(clusterId)) {
      groups.set(clusterId, []);
    }
    groups.get(clusterId)!.push(page);
  }

  return groups;
}


