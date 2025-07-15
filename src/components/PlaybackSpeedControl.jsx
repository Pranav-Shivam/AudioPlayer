// File: src/components/PlaybackSpeedControl.js
import React, { memo, useCallback, useState, useRef, useEffect } from 'react';

const PlaybackSpeedControl = memo(({ changePlaybackSpeed, disabled = false }) => {
  const [speed, setSpeed] = useState(1.0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const speeds = [
    { value: 0.5, label: '0.5x' },
    { value: 0.75, label: '0.75x' },
    { value: 1.0, label: '1x' },
    { value: 1.25, label: '1.25x' },
    { value: 1.5, label: '1.5x' },
    { value: 1.75, label: '1.75x' },
    { value: 2.0, label: '2x' }
  ];

  const handleChange = useCallback((newSpeed) => {
    if (disabled) return;
    
    setSpeed(newSpeed);
    changePlaybackSpeed(newSpeed);
    setIsOpen(false);
  }, [changePlaybackSpeed, disabled]);

  const handleClickOutside = useCallback((e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, handleClickOutside]);

  const currentSpeed = speeds.find(s => s.value === speed) || speeds[2];

  return (
    <div className="playback-speed-control" ref={dropdownRef}>
      <div className="speed-control-container">
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-label={`Current playback speed: ${currentSpeed.label}`}
          className="playback-speed-button"
          title={`Current speed: ${currentSpeed.label}`}
        >
          <span className="speed-label">{currentSpeed.label}</span>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            className={`speed-arrow ${isOpen ? 'open' : ''}`}
            aria-hidden="true"
          >
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </button>
        
        {isOpen && (
          <div className="speed-dropdown-fixed">
            <div className="speed-indicator">
              <div className="speed-scale">
                {speeds.map((speedOption, index) => (
                  <div key={speedOption.value} className="speed-scale-point">
                    <div 
                      className={`scale-marker ${speedOption.value === speed ? 'active' : ''}`}
                      onClick={() => handleChange(speedOption.value)}
                    />
                    <span className="scale-label">{speedOption.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default PlaybackSpeedControl;