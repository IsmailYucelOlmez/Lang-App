import React, { useState, useRef, useEffect } from 'react';
import useAudio from '../../audio/hooks/useAudio';

interface PageAudioPlayerProps {
  text: string;
  pageNumber: number;
  className?: string;
  darkTheme?: boolean;
}

const PageAudioPlayer: React.FC<PageAudioPlayerProps> = ({ 
  text, 
  pageNumber, 
  className = '',
  darkTheme = false 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { audio, isLoading, error, refetch } = useAudio(text);

  useEffect(() => {
    if (audio && audioRef.current) {
      const audioUrl = URL.createObjectURL(audio);
      audioRef.current.src = audioUrl;
      
      audioRef.current.addEventListener('loadedmetadata', () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
        }
      });

      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      });

      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });

      return () => {
        URL.revokeObjectURL(audioUrl);
      };
    }
  }, [audio]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className={`flex items-center space-x-3 p-2 ${darkTheme ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-600'} rounded-lg ${className}`}>
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
        <span className="text-xs">Ses oluşturuluyor...</span>
      </div>
    );
  }

  if (!audio || error) {
    const errorMessage = error?.message || 'API anahtarı eksik';
    const isRateLimit = errorMessage.includes('rate limit');
    
    return (
      <div className={`${darkTheme ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} rounded-lg p-2 shadow-sm border ${darkTheme ? 'border-gray-700' : 'border-gray-200'} ${className}`}>
        <div className="flex items-center space-x-2">
          <button
            disabled={!isRateLimit}
            className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors text-xs ${
              isRateLimit 
                ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={() => {
              if (isRateLimit) {
                refetch();
              }
            }}
          >
            {isRateLimit ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 111.885-.666z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          <div className="flex-1">
            <div className="text-xs">
              Sayfa {pageNumber} - 🎵
            </div>
            <div className="text-xs opacity-75">
              {errorMessage.includes('VITE_GOOGLE_TTS_API_KEY') 
                ? 'API anahtarı eksik'
                : errorMessage.includes('rate limit')
                ? 'Rate limit - yeniden dene'
                : errorMessage
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${darkTheme ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} rounded-lg p-2 shadow-sm border ${darkTheme ? 'border-gray-700' : 'border-gray-200'} ${className}`}>
      <div className="flex items-center space-x-2">
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors text-xs ${
            isPlaying 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isPlaying ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        <div className="flex-1">
          <div className="flex items-center space-x-1 mb-1">
            <span className="text-xs">{formatTime(currentTime)}</span>
            <div className="flex-1">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / (duration || 1)) * 100}%, #e5e7eb ${(currentTime / (duration || 1)) * 100}%, #e5e7eb 100%)`
                }}
              />
            </div>
            <span className="text-xs">{formatTime(duration)}</span>
          </div>
          <div className="text-xs opacity-75">
            Sayfa {pageNumber} - {isPlaying ? 'Çalıyor...' : 'Duraklatıldı'}
          </div>
        </div>
      </div>
      
      <audio ref={audioRef} preload="metadata" />
    </div>
  );
};

export default PageAudioPlayer; 