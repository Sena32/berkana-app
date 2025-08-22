'use client';
import React, { useMemo, useState, useRef, useEffect } from 'react';

interface CourseVideoPlayerProps {
  videoUrl: string;
  posterImage: string;
}

const extractVimeoId = (input: string): string | null => {
  if (!input) return null;
  const trimmed = input.trim();

  // Caso seja apenas o ID numérico
  if (/^\d+$/.test(trimmed)) return trimmed;

  // URLs comuns do Vimeo
  const patterns = [
    /vimeo\.com\/(?:video\/)?(\d+)/i,            // vimeo.com/12345 ou vimeo.com/video/12345
    /player\.vimeo\.com\/video\/(\d+)/i,         // player.vimeo.com/video/12345
  ];

  for (const re of patterns) {
    const m = trimmed.match(re);
    if (m && m[1]) return m[1];
  }

  return null;
};

const CourseVideoPlayer: React.FC<CourseVideoPlayerProps> = ({ videoUrl, posterImage }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(600); // 10:00 em segundos
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPictureInPicture, setIsPictureInPicture] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const vimeoId = useMemo(() => extractVimeoId(videoUrl), [videoUrl]);
  console.log('CourseVideoPlayer - videoUrl:', videoUrl);
  console.log('CourseVideoPlayer - vimeoId:', vimeoId);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    } else {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    }
  };

  const handlePictureInPicture = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
      setIsPictureInPicture(false);
    } else if (document.pictureInPictureEnabled) {
      videoRef.current?.requestPictureInPicture();
      setIsPictureInPicture(true);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const handleMouseLeave = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  // Melhorar validação e mostrar mais informações de debug
  if (!videoUrl || videoUrl.trim() === '') {
    return (
      <div className="bg-black rounded-lg overflow-hidden">
        <div className="relative w-full aspect-video flex items-center justify-center text-white text-sm">
          <div className="text-center">
            <p>URL do vídeo não fornecida</p>
            <p className="text-xs text-gray-400 mt-1">videoUrl: "{videoUrl}"</p>
          </div>
        </div>
      </div>
    );
  }

  if (!vimeoId) {
    return (
      <div className="bg-black rounded-lg overflow-hidden">
        <div className="relative w-full aspect-video flex items-center justify-center text-white text-sm">
          <div className="text-center">
            <p>URL do Vimeo inválida</p>
            <p className="text-xs text-gray-400 mt-1">URL fornecida: "{videoUrl}"</p>
            <p className="text-xs text-gray-400">Formato esperado: vimeo.com/12345</p>
          </div>
        </div>
      </div>
    );
  }

  const src = `https://player.vimeo.com/video/${vimeoId}?dnt=1&byline=0&portrait=0&title=0&transparent=0`;

  return (
    <div 
      className="bg-black rounded-lg overflow-hidden relative group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full aspect-video">
        <iframe
          src={src}
          className="w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          title="Vimeo video player"
        />
      </div>

      {/* Botão de play central - semi-transparente com borda sutil */}
      {!isPlaying && (
        <button
          onClick={handlePlayPause}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-30 transition-all duration-300"
        >
          <div className="w-16 h-16 bg-gray-200 bg-opacity-80 rounded-full flex items-center justify-center border border-gray-300 border-opacity-50 shadow-lg">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="text-gray-700">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}

      {/* Barra de controle inferior - semi-transparente e branca */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 backdrop-blur-sm transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center gap-4 p-3">
          {/* Botão play/pause (canto esquerdo) */}
          <button
            onClick={handlePlayPause}
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            {isPlaying ? (
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Barra de progresso */}
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #374151 ${(currentTime / duration) * 100}%, #d1d5db ${(currentTime / duration) * 100}%)`
              }}
            />
          </div>

          {/* Contador de tempo */}
          <div className="text-gray-700 text-sm font-medium">
            {formatTime(currentTime)}/{formatTime(duration)}
          </div>

          {/* Ícones de controle (canto direito) */}
          <div className="flex items-center gap-2">
            {/* Tela cheia */}
            <button 
              onClick={handleFullscreen}
              className="text-gray-700 hover:text-gray-900 transition-colors p-1"
              title="Tela cheia"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
            </button>

            {/* Picture-in-Picture */}
            <button 
              onClick={handlePictureInPicture}
              className="text-gray-700 hover:text-gray-900 transition-colors p-1"
              title="Picture-in-Picture"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 7h-8v6h8V7zm-2 4h-4V9h4v2zM21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z" />
              </svg>
            </button>

            {/* Volume */}
            <div className="relative">
              <button 
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
                className="text-gray-700 hover:text-gray-900 transition-colors p-1"
                title="Volume"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              </button>
              
              {/* Slider de volume */}
              {showVolumeSlider && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white bg-opacity-95 rounded-lg p-2 shadow-lg">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to top, #374151 ${volume * 100}%, #d1d5db ${volume * 100}%)`
                    }}
                  />
                </div>
              )}
            </div>

            {/* Configurações */}
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="text-gray-700 hover:text-gray-900 transition-colors p-1"
              title="Configurações"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseVideoPlayer;