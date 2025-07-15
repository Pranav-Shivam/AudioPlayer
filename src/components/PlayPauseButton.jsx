// File: src/components/PlayPauseButton.js
import React, { memo } from 'react';

const PlayPauseButton = memo(({ isPlaying, togglePlayPause, isLoading = false, disabled = false }) => {
  const handleClick = (e) => {
    e.preventDefault();
    if (!disabled && !isLoading) {
      togglePlayPause();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled || isLoading}
      aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
      aria-describedby={isLoading ? 'loading-description' : undefined}
      className={`audio-player-button play-pause-button ${isLoading ? 'loading' : ''} ${disabled ? 'disabled' : ''}`}
      title={isLoading ? 'Loading...' : isPlaying ? 'Pause' : 'Play'}
    >
      {isLoading ? (
        <div className="loading-spinner" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="31.416" strokeDashoffset="31.416">
              <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
              <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
      ) : isPlaying ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
      {isLoading && <span id="loading-description" className="sr-only">Loading audio file</span>}
    </button>
  );
});

export default PlayPauseButton;