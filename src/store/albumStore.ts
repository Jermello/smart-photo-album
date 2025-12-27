'use client';

import { create } from 'zustand';
import { AlbumPage, Cluster } from '@/types/album';
import { mockPages, mockClusters } from '@/data/mockAlbum';

interface AlbumStore {
  pages: AlbumPage[];
  clusters: Cluster[];
  currentPageIndex: number;
  
  // Navigation
  setCurrentPageIndex: (index: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  
  // Cluster reordering
  reorderClusters: (fromIndex: number, toIndex: number) => void;
  
  // Actions
  regenerateLayouts: () => void;
}

export const useAlbumStore = create<AlbumStore>((set, get) => ({
  pages: mockPages,
  clusters: mockClusters,
  currentPageIndex: 0,
  
  setCurrentPageIndex: (index) => {
    const { pages } = get();
    if (index >= 0 && index < pages.length) {
      set({ currentPageIndex: index });
    }
  },
  
  goToNextPage: () => {
    const { currentPageIndex, pages } = get();
    if (currentPageIndex < pages.length - 1) {
      set({ currentPageIndex: currentPageIndex + 1 });
    }
  },
  
  goToPreviousPage: () => {
    const { currentPageIndex } = get();
    if (currentPageIndex > 0) {
      set({ currentPageIndex: currentPageIndex - 1 });
    }
  },
  
  reorderClusters: (fromIndex, toIndex) => {
    set((state) => {
      const newClusters = [...state.clusters];
      const [removed] = newClusters.splice(fromIndex, 1);
      newClusters.splice(toIndex, 0, removed);
      
      // Rebuild pages array based on new cluster order
      const newPages: AlbumPage[] = [];
      newClusters.forEach((cluster) => {
        cluster.pageIds.forEach((pageId) => {
          const page = state.pages.find((p) => p.id === pageId);
          if (page) newPages.push(page);
        });
      });
      
      return { clusters: newClusters, pages: newPages };
    });
  },
  
  regenerateLayouts: () => {
    // Stub for now - would call the layout engine
    console.log('Regenerating layouts...');
  },
}));

