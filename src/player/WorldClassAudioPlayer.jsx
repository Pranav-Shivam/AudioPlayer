// File: src/WorldClassAudioPlayer.js
import React, { memo, useEffect, useState, useRef, useCallback } from 'react';
import PlayPauseButton from '../components/PlayPauseButton';
import ProgressBar from '../components/ProgressBar';
import VolumeControl from '../components/VolumeControl';
import PlaybackSpeedControl from '../components/PlaybackSpeedControl';
import '../styles/AudioPlayer.css';

const WorldClassAudioPlayer = memo(({ trackUrl, trackTitle = 'Unknown Track' }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadStart = () => {
      setIsLoading(true);
      setHasError(false);
      setIsReady(false);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      setIsReady(true);
      setHasError(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setHasError(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsReady(true);
    };

    const handleError = (e) => {
      console.error('Audio playback error:', e);
      setIsPlaying(false);
      setIsLoading(false);
      setHasError(true);
      setIsReady(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleVolumeChange = () => {
      setVolume(audio.volume);
    };

    const handleRateChange = () => {
      // Handle playback rate changes if needed
    };

    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('volumechange', handleVolumeChange);
    audio.addEventListener('ratechange', handleRateChange);

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('volumechange', handleVolumeChange);
      audio.removeEventListener('ratechange', handleRateChange);
    };
  }, []);

  useEffect(() => {
    if (trackUrl && trackUrl !== currentTrack) {
      setCurrentTrack(trackUrl);
      if (audioRef.current) {
        audioRef.current.src = trackUrl;
        audioRef.current.load();
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
        setIsLoading(true);
        setHasError(false);
        setIsReady(false);
      }
    }
  }, [trackUrl, currentTrack]);

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (audio && isReady && !hasError) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch((error) => {
          console.error('Playback failed:', error);
          setHasError(true);
        });
      }
    }
  }, [isPlaying, isReady, hasError]);

  const seek = useCallback((time) => {
    const audio = audioRef.current;
    if (audio && !isNaN(time) && time >= 0 && time <= duration && isReady) {
      audio.currentTime = time;
    }
  }, [duration, isReady]);

  const changeVolume = useCallback((newVolume) => {
    const audio = audioRef.current;
    if (audio && newVolume >= 0 && newVolume <= 1) {
      audio.volume = newVolume;
      setVolume(newVolume);
    }
  }, []);

  const changePlaybackSpeed = useCallback((speed) => {
    const audio = audioRef.current;
    if (audio && speed > 0 && isReady) {
      audio.playbackRate = speed;
    }
  }, [isReady]);

  const getPlayerState = () => {
    if (hasError) return 'error';
    if (isLoading) return 'loading';
    if (isPlaying) return 'playing';
    if (isReady) return 'ready';
    return 'idle';
  };

  const playerState = getPlayerState();

  return (
    <div 
      className={`audio-player-container ${playerState}`} 
      role="region" 
      aria-label="Audio Player"
      aria-live="polite"
      aria-describedby={hasError ? 'error-message' : undefined}
    >
      <div className="track-info">
        <div className="album-art-placeholder" aria-hidden="true" />
        <h3 className="track-title">{trackTitle}</h3>
      </div>

      <ProgressBar 
        currentTime={currentTime}
        duration={duration}
        seek={seek}
        isLoading={isLoading}
        disabled={!isReady || hasError}
      />

      <div className="controls-section">
        <VolumeControl 
          volume={volume}
          changeVolume={changeVolume}
          disabled={!isReady || hasError}
        />
        
        <PlayPauseButton 
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
          isLoading={isLoading}
          disabled={!isReady || hasError}
        />
        
        <PlaybackSpeedControl 
          changePlaybackSpeed={changePlaybackSpeed}
          disabled={!isReady || hasError}
        />
      </div>

      {hasError && (
        <div id="error-message" className="error-message" role="alert">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span>Unable to play audio file. Please try another file.</span>
        </div>
      )}

      <audio 
        ref={audioRef} 
        preload="auto" 
        style={{ display: 'none' }}
        crossOrigin="anonymous"
      />
    </div>
  );
});

export default WorldClassAudioPlayer;