// File: src/context/AudioPlayerContext.js
import React, {
  createContext, useContext, useRef, useState, useEffect, useCallback
} from 'react';

const AudioPlayerContext = createContext(null);

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) throw new Error('useAudioPlayer must be used within AudioPlayerProvider');
  return context;
};

export const AudioPlayerProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [activePlayerId, setActivePlayerId] = useState(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleVolumeChange = () => setVolume(audio.volume);
    const handleError = (e) => {
      console.error('Audio playback error:', e);
      alert('An error occurred during audio playback.');
      setIsPlaying(false);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('volumechange', handleVolumeChange);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('volumechange', handleVolumeChange);
      audio.removeEventListener('error', handleError);
    };
  }, [volume]);

  const loadTrack = useCallback((trackUrl, playerId = null) => {
    if (audioRef.current) {
      audioRef.current.src = trackUrl;
      audioRef.current.load();
      setCurrentTrack(trackUrl);
      setActivePlayerId(playerId);
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      isPlaying ? audio.pause() : audio.play().catch(console.error);
    }
  }, [isPlaying]);

  const seek = useCallback((time) => {
    const audio = audioRef.current;
    if (audio && !isNaN(time) && time >= 0 && time <= duration) {
      audio.currentTime = time;
    }
  }, [duration]);

  const changeVolume = useCallback((newVolume) => {
    const audio = audioRef.current;
    if (audio && newVolume >= 0 && newVolume <= 1) {
      audio.volume = newVolume;
      setVolume(newVolume);
    }
  }, []);

  const changePlaybackSpeed = useCallback((speed) => {
    const audio = audioRef.current;
    if (audio && speed > 0) {
      audio.playbackRate = speed;
    }
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={{
        audioRef,
        isPlaying,
        currentTime,
        duration,
        volume,
        currentTrack,
        activePlayerId,
        loadTrack,
        togglePlayPause,
        seek,
        changeVolume,
        changePlaybackSpeed,
      }}>
      {children}
      <audio ref={audioRef} preload="auto" style={{ display: 'none' }} />
    </AudioPlayerContext.Provider>
  );
};
