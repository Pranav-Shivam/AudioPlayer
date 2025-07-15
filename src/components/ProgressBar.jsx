// File: src/components/ProgressBar.js
import React, { memo, useCallback, useState } from 'react';

const ProgressBar = memo(({ currentTime, duration, seek, isLoading = false, disabled = false }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [hoverTime, setHoverTime] = useState(null);

  const handleSeek = useCallback((e) => {
    if (disabled || isLoading) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    
    if (!isNaN(newTime) && newTime >= 0 && newTime <= duration) {
      seek(newTime);
    }
  }, [seek, duration, disabled, isLoading]);

  const handleMouseMove = useCallback((e) => {
    if (disabled || isLoading) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, mouseX / rect.width));
    const hoverTimeValue = percentage * duration;
    setHoverTime(hoverTimeValue);
  }, [duration, disabled, isLoading]);

  const handleMouseLeave = useCallback(() => {
    setHoverTime(null);
  }, []);

  const handleSliderChange = useCallback((e) => {
    if (disabled || isLoading) return;
    
    const newTime = parseFloat(e.target.value);
    if (!isNaN(newTime) && newTime >= 0 && newTime <= duration) {
      seek(newTime);
    }
  }, [seek, duration, disabled, isLoading]);

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || timeInSeconds === Infinity || timeInSeconds < 0) return '--:--';
    
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    if (!duration || duration === 0) return 0;
    return (currentTime / duration) * 100;
  };

  const getHoverPercentage = () => {
    if (!hoverTime || !duration || duration === 0) return 0;
    return (hoverTime / duration) * 100;
  };

  return (
    <div className="progress-bar-container">
      <span className="current-time" aria-label="Current time">
        {formatTime(currentTime)}
      </span>
      
      <div 
        className="progress-bar-wrapper"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="progress-bar-track">
          <div 
            className="progress-bar-fill"
            style={{ width: `${getProgressPercentage()}%` }}
            aria-hidden="true"
          />
          {hoverTime && (
            <div 
              className="progress-bar-hover"
              style={{ width: `${getHoverPercentage()}%` }}
              aria-hidden="true"
            />
          )}
        </div>
        
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSliderChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          step="0.1"
          disabled={disabled || isLoading}
          aria-label="Audio progress"
          aria-valuemin="0"
          aria-valuemax={duration || 0}
          aria-valuenow={currentTime}
          aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
          className={`progress-slider ${isDragging ? 'dragging' : ''} ${isLoading ? 'loading' : ''}`}
        />
        
        {hoverTime && (
          <div 
            className="progress-tooltip"
            style={{ left: `${getHoverPercentage()}%` }}
            aria-hidden="true"
          >
            {formatTime(hoverTime)}
          </div>
        )}
      </div>
      
      <span className="duration" aria-label="Total duration">
        {formatTime(duration)}
      </span>
    </div>
  );
});

export default ProgressBar;