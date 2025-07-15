import React, { useState, useEffect } from 'react';
import TrackCard from './TrackCard';

const FileUpload = ({ onFilesChange }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const audioFiles = files.filter(file => file.type.startsWith('audio/'));
    
    const fileObjects = audioFiles.map(file => ({
      url: URL.createObjectURL(file),
      name: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
      file: file,
      id: Math.random().toString(36).substr(2, 9)
    }));
    
    const newFiles = [...selectedFiles, ...fileObjects];
    setSelectedFiles(newFiles);
    onFilesChange(newFiles);
  };

  const handleRemoveFile = (index) => {
    const fileToRemove = selectedFiles[index];
    // Clean up the object URL to prevent memory leaks
    if (fileToRemove && fileToRemove.url) {
      URL.revokeObjectURL(fileToRemove.url);
    }
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFilesChange(newFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const audioFiles = files.filter(file => file.type.startsWith('audio/'));
    
    const fileObjects = audioFiles.map(file => ({
      url: URL.createObjectURL(file),
      name: file.name.replace(/\.[^/.]+$/, ""),
      file: file,
      id: Math.random().toString(36).substr(2, 9)
    }));
    
    const newFiles = [...selectedFiles, ...fileObjects];
    setSelectedFiles(newFiles);
    onFilesChange(newFiles);
  };

  const handleClearAll = () => {
    selectedFiles.forEach(file => {
      if (file.url) URL.revokeObjectURL(file.url);
    });
    setSelectedFiles([]);
    onFilesChange([]);
  };

  // Cleanup object URLs when component unmounts
  useEffect(() => {
    return () => {
      selectedFiles.forEach(file => {
        if (file.url) {
          URL.revokeObjectURL(file.url);
        }
      });
    };
  }, [selectedFiles]);

  return (
    <>
      <div className="upload-section">
        <div 
          className={`upload-area ${isDragOver ? 'drag-over' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="audio/*"
            multiple
            onChange={handleFileSelect}
            id="audio-file-input"
            className="file-input"
          />
          <label htmlFor="audio-file-input" className="upload-label">
            <div className="upload-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </div>
            <div className="upload-text">
              <h3>Drop your audio files here</h3>
              <p>or click to browse</p>
            </div>
            <div className="upload-hint">
              <span>Supports MP3, WAV, FLAC, and more</span>
            </div>
          </label>
        </div>
      </div>

      {selectedFiles.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🎧</div>
          <h2>No tracks yet</h2>
          <p>Upload some audio files to get started with your music experience</p>
        </div>
      ) : (
        <div className="tracks-container">
          <div className="tracks-header">
            <h2>Your Tracks ({selectedFiles.length})</h2>
            <button 
              className="clear-all-btn"
              onClick={handleClearAll}
            >
              Clear All
            </button>
          </div>
          
          <div className="tracks-grid">
            {selectedFiles.map((file, index) => (
              <TrackCard
                key={file.id}
                file={file}
                index={index}
                onRemove={handleRemoveFile}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FileUpload; 