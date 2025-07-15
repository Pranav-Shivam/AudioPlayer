// File: src/App.js
import React, { useState, useEffect } from 'react';
import WorldClassAudioPlayer from './player/WorldClassAudioPlayer';
import './styles/App.css';

function App() {
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
    
    setSelectedFiles(prev => [...prev, ...fileObjects]);
  };

  const handleRemoveFile = (index) => {
    const fileToRemove = selectedFiles[index];
    // Clean up the object URL to prevent memory leaks
    if (fileToRemove && fileToRemove.url) {
      URL.revokeObjectURL(fileToRemove.url);
    }
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
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
    
    setSelectedFiles(prev => [...prev, ...fileObjects]);
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
    <div className="App">
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">
              <span className="title-icon">🎵</span>
              Audio Player
            </h1>
            <p className="app-subtitle">
              Upload and enjoy your music with our premium audio experience
            </p>
          </div>
        </header>

        <main className="app-main">
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
                  onClick={() => {
                    selectedFiles.forEach(file => {
                      if (file.url) URL.revokeObjectURL(file.url);
                    });
                    setSelectedFiles([]);
                  }}
                >
                  Clear All
                </button>
              </div>
              
              <div className="tracks-grid">
                {selectedFiles.map((file, index) => (
                  <div key={file.id} className="track-card">
                    <div className="track-header">
                      <div className="track-info">
                        <div className="track-number">#{index + 1}</div>
                        <h3 className="track-title">{file.name}</h3>
                      </div>
                      <button 
                        onClick={() => handleRemoveFile(index)}
                        className="remove-track-btn"
                        aria-label="Remove track"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                      </button>
                    </div>
                    <WorldClassAudioPlayer 
                      trackUrl={file.url} 
                      trackTitle={file.name} 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
