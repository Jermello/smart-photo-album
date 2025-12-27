'use client';

import React from 'react';
import Image from 'next/image';
import { AlbumPage, LayoutType } from '@/types/album';
import { cn } from '@/lib/utils';

interface PageRendererProps {
  page: AlbumPage;
  variant?: 'full' | 'thumbnail';
  isSelected?: boolean;
  onClick?: () => void;
}

const PageRenderer: React.FC<PageRendererProps> = ({
  page,
  variant = 'full',
  isSelected = false,
  onClick,
}) => {
  const isThumbnail = variant === 'thumbnail';
  
  const containerClass = cn(
    'relative overflow-hidden',
    isThumbnail
      ? cn('album-page-thumbnail aspect-[3/4]', isSelected && 'selected')
      : 'album-page aspect-[3/4] w-full max-w-[500px]'
  );

  const getLayoutClass = (layout: LayoutType): string => {
    const layoutMap: Record<LayoutType, string> = {
      '1': 'layout-1',
      '2h': 'layout-2h',
      '2v': 'layout-2v',
      '3a': 'layout-3a',
      '3b': 'layout-3b',
      '4': 'layout-4',
    };
    return layoutMap[layout];
  };

  return (
    <div
      className={containerClass}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      <div className={cn('photo-grid', getLayoutClass(page.layout))}>
        {page.photos.map((photo) => (
          <div key={photo.id} className="photo-item">
            <Image
              src={photo.src}
              alt=""
              width={photo.width}
              height={photo.height}
              loading={isThumbnail ? 'lazy' : 'eager'}
              draggable={false}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageRenderer;
