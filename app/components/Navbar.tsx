"use client";

import { useRef } from "react";

export default function Navbar() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log("Selected files:", Array.from(files).map(f => f.name));
      // TODO: Wire up actual upload logic
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex h-full items-center justify-between px-6 max-w-7xl mx-auto">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold text-black dark:text-zinc-50">
            Smart Photo Album
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={handleUploadClick}
            className="flex h-9 items-center justify-center rounded-full bg-black px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
          >
            Upload photos
          </button>
        </div>
      </div>
    </nav>
  );
}


