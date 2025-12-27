'use client';

import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { useAlbumStore } from '@/store/albumStore';
import { Cluster } from '@/types/album';
import PageRenderer from './PageRenderer';

interface SortableClusterProps {
  cluster: Cluster;
  children: React.ReactNode;
}

const SortableCluster: React.FC<SortableClusterProps> = ({ cluster, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: cluster.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="cluster-group">
      <div className="flex items-center gap-1 mb-2">
        <button
          className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-secondary/50 text-muted-foreground"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-3 h-3" />
        </button>
        <span className="cluster-label flex-1">{cluster.label}</span>
      </div>
      {children}
    </div>
  );
};

const Sidebar: React.FC = () => {
  const { pages, clusters, currentPageIndex, setCurrentPageIndex, reorderClusters } = useAlbumStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = clusters.findIndex((c) => c.id === active.id);
      const newIndex = clusters.findIndex((c) => c.id === over.id);
      reorderClusters(oldIndex, newIndex);
    }
  };

  const getPageIndex = (pageId: string): number => {
    return pages.findIndex((p) => p.id === pageId);
  };

  return (
    <aside className="w-sidebar flex-shrink-0 bg-sidebar border-l border-sidebar-border overflow-hidden flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-sm font-medium text-sidebar-foreground">Pages</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Drag clusters to reorder
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 scrollbar-thin">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={clusters.map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            {clusters.map((cluster) => (
              <SortableCluster key={cluster.id} cluster={cluster}>
                <div className="grid grid-cols-2 gap-2">
                  {cluster.pageIds.map((pageId) => {
                    const page = pages.find((p) => p.id === pageId);
                    const pageIndex = getPageIndex(pageId);
                    if (!page) return null;

                    return (
                      <div key={pageId} className="relative">
                        <PageRenderer
                          page={page}
                          variant="thumbnail"
                          isSelected={pageIndex === currentPageIndex}
                          onClick={() => setCurrentPageIndex(pageIndex)}
                        />
                        <span className="absolute bottom-1 right-1 text-[10px] font-medium bg-card/90 px-1 rounded text-foreground/70">
                          {pageIndex === 0 ? 'Cover' : pageIndex}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </SortableCluster>
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </aside>
  );
};

export default Sidebar;
