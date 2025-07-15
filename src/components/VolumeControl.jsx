// File: src/components/VolumeControl.js
import React, { memo, useCallback, useState } from 'react';

const VolumeControl = memo(({ volume, changeVolume, disabled = false }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);

  const handleVolumeChange = useCallback((e) => {
    if (disabled) return;
    
    const newVolume = parseFloat(e.target.value);
    if (!isNaN(newVolume) && newVolume >= 0 && newVolume <= 1) {
      changeVolume(newVolume);
      setIsMuted(false);
    }
  }, [changeVolume, disabled]);

  const handleMuteToggle = useCallback(() => {
    if (disabled) return;
    
    if (isMuted) {
      // Unmute - restore previous volume
      changeVolume(previousVolume);
      setIsMuted(false);
    } else {
      // Mute - store current volume and set to 0
      setPreviousVolume(volume);
      changeVolume(0);
      setIsMuted(true);
    }
  }, [isMuted, volume, previousVolume, changeVolume, disabled]);

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
        </svg>
      );
    } else if (volume < 0.5) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
        </svg>
      );
    } else {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.9-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
      );
    }
  };

  const getVolumePercentage = () => {
    return isMuted ? 0 : Math.round(volume * 100);
  };

  return (
    <div className="volume-control-container">
      <button
        onClick={handleMuteToggle}
        disabled={disabled}
        aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
        className="volume-icon-button"
        title={`${isMuted ? 'Unmute' : 'Mute'} (current volume: ${getVolumePercentage()}%)`}
      >
        {getVolumeIcon()}
      </button>
      
      <div className="volume-slider-container">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          disabled={disabled}
          aria-label={`Volume: ${getVolumePercentage()}%`}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={getVolumePercentage()}
          className={`volume-slider ${isMuted ? 'muted' : ''}`}
        />
        
        <div className="volume-percentage" aria-hidden="true">
          {getVolumePercentage()}%
        </div>
      </div>
    </div>
  );
});

export default VolumeControl;