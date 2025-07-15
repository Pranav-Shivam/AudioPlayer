// File: src/components/PlaybackSpeedControl.js
import React, { memo, useCallback, useState, useRef, useEffect } from 'react';

const PlaybackSpeedControl = memo(({ changePlaybackSpeed, disabled = false }) => {
  const [speed, setSpeed] = useState(1.0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const speeds = [
    { value: 0.5, label: '0.5x', description: 'Half speed' },
    { value: 0.75, label: '0.75x', description: 'Three-quarter speed' },
    { value: 1.0, label: '1x', description: 'Normal speed' },
    { value: 1.25, label: '1.25x', description: 'Fast' },
    { value: 1.5, label: '1.5x', description: 'Faster' },
    { value: 1.75, label: '1.75x', description: 'Very fast' },
    { value: 2.0, label: '2x', description: 'Double speed' }
  ];

  const handleChange = useCallback((newSpeed) => {
    if (disabled) return;
    
    setSpeed(newSpeed);
    changePlaybackSpeed(newSpeed);
    setIsOpen(false);
  }, [changePlaybackSpeed, disabled]);

  const handleKeyDown = useCallback((e) => {
    if (disabled) return;
    
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          const currentIndex = speeds.findIndex(s => s.value === speed);
          const nextIndex = (currentIndex + 1) % speeds.length;
          handleChange(speeds[nextIndex].value);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          const currentIndex = speeds.findIndex(s => s.value === speed);
          const prevIndex = currentIndex === 0 ? speeds.length - 1 : currentIndex - 1;
          handleChange(speeds[prevIndex].value);
        }
        break;
      default:
        break;
    }
  }, [disabled, isOpen, speed, speeds, handleChange]);

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
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-label={`Playback speed: ${currentSpeed.label}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="playback-speed-button"
        title={`Current speed: ${currentSpeed.label} - ${currentSpeed.description}`}
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
        <div className="speed-dropdown" role="listbox" aria-label="Playback speed options">
          {speeds.map((speedOption) => (
            <button
              key={speedOption.value}
              onClick={() => handleChange(speedOption.value)}
              className={`speed-option ${speedOption.value === speed ? 'selected' : ''}`}
              role="option"
              aria-selected={speedOption.value === speed}
              title={speedOption.description}
            >
              <span className="speed-value">{speedOption.label}</span>
              <span className="speed-description">{speedOption.description}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

export default PlaybackSpeedControl;