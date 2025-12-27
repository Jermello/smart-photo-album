'use client';

import { useEffect } from 'react';
import { useAlbumStore } from '@/store/albumStore';
import Navbar from '@/components/Navbar';
import AlbumViewer from '@/components/AlbumViewer';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  const { goToNextPage, goToPreviousPage } = useAlbumStore();

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft') {
        goToPreviousPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextPage, goToPreviousPage]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main content area below navbar */}
      <div className="flex flex-1 pt-navbar">
        {/* Album Viewer (center) */}
        <AlbumViewer />

        {/* Sidebar (right) */}
        <Sidebar />
      </div>
    </div>
  );
}
