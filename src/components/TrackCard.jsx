import React from 'react';
import WorldClassAudioPlayer from '../player/WorldClassAudioPlayer';

const TrackCard = ({ file, index, onRemove }) => {
  return (
    <div className="track-card">
      <div className="track-header">
        <div className="track-info">
          <div className="track-number">#{index + 1}</div>
          <h3 className="track-title">{file.name}</h3>
        </div>
        <button 
          onClick={() => onRemove(index)}
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
  );
};

export default TrackCard; 