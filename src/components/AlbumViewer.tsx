'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAlbumStore } from '@/store/albumStore';
import PageRenderer from './PageRenderer';

const AlbumViewer: React.FC = () => {
  const { pages, currentPageIndex, goToNextPage, goToPreviousPage } = useAlbumStore();
  
  const currentPage = pages[currentPageIndex];
  const totalPages = pages.length;
  const canGoBack = currentPageIndex > 0;
  const canGoForward = currentPageIndex < totalPages - 1;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-album-canvas min-h-0">
      {/* Page counter */}
      <div className="mb-4 text-sm font-medium text-muted-foreground">
        {currentPageIndex === 0 ? 'Cover' : `Page ${currentPageIndex}`} / {totalPages - 1}
      </div>

      {/* Main page display with navigation */}
      <div className="flex items-center gap-6 max-w-full">
        {/* Left arrow */}
        <button
          onClick={goToPreviousPage}
          disabled={!canGoBack}
          className="nav-arrow flex-shrink-0"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Album page */}
        <div className="animate-fade-in" key={currentPage.id}>
          <PageRenderer 
            page={currentPage} 
            variant="full" 
            isCoverPage={currentPageIndex === 0}
          />
        </div>

        {/* Right arrow */}
        <button
          onClick={goToNextPage}
          disabled={!canGoForward}
          className="nav-arrow flex-shrink-0"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Keyboard navigation hint */}
      <div className="mt-4 text-xs text-muted-foreground/60">
        Use ← → arrows to navigate
      </div>
    </div>
  );
};

export default AlbumViewer;

