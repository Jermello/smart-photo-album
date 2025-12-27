'use client';

import React, { useRef } from 'react';
import { Upload, RefreshCw, FileDown } from 'lucide-react';

const Navbar: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    // Trigger file input
    fileInputRef.current?.click();
  };

  const handleRegenerate = () => {
    console.log('Regenerating layouts...');
  };

  const handleExport = () => {
    console.log('Exporting PDF...');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-navbar bg-card border-b border-border z-50">
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo / App Name */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-semibold text-sm">S</span>
          </div>
          <h1 className="text-lg font-semibold text-foreground tracking-tight">
            Smart Photo Album
          </h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            multiple
            accept="image/*"
            onChange={(e) => {
              const files = e.target.files;
              if (files?.length) {
                console.log(`${files.length} files selected`);
              }
            }}
          />

          <button
            onClick={handleUpload}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-secondary rounded-md transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Upload</span>
          </button>

          <button
            onClick={handleRegenerate}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-secondary rounded-md transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Regenerate</span>
          </button>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors"
          >
            <FileDown className="w-4 h-4" />
            <span className="hidden sm:inline">Export PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

