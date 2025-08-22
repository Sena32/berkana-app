'use client';
import React, { useMemo } from 'react';

interface CourseVideoPlayerSimpleProps {
  videoUrl: string;
  posterImage?: string;
  width?: string;
  height?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
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

const CourseVideoPlayerSimple: React.FC<CourseVideoPlayerSimpleProps> = ({ 
  videoUrl, 
  posterImage,
  width = '100%',
  height = 'auto',
  autoplay = false,
  loop = false,
  muted = false
}) => {
  const vimeoId = useMemo(() => extractVimeoId(videoUrl), [videoUrl]);

  if (!videoUrl || videoUrl.trim() === '') {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 text-center border border-slate-200 shadow-sm">
        <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-slate-500">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-slate-600 font-medium">URL do vídeo não fornecida</p>
        <p className="text-slate-400 text-sm mt-1">Adicione uma URL válida do Vimeo</p>
      </div>
    );
  }

  if (!vimeoId) {
    return (
      <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-8 text-center border border-amber-200 shadow-sm">
        <div className="w-16 h-16 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-amber-600">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p className="text-amber-700 font-medium">URL do Vimeo inválida</p>
        <p className="text-amber-600 text-sm mt-1">Formato esperado: vimeo.com/12345</p>
        <p className="text-amber-500 text-xs mt-2">URL fornecida: "{videoUrl}"</p>
      </div>
    );
  }

  // Parâmetros para remover logo e personalizar cores
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    loop: loop ? '1' : '0',
    muted: muted ? '1' : '0',
    logo: '0',           // Remove logo do Vimeo
    color: 'FFFFFF',     // Cor principal do site (verde)
    colors: "FFFFFF,B5D334,000000,B5D334",
    title: '0',          // Remove título
    byline: '0',         // Remove linha de autor
    portrait: '0',       // Remove avatar do autor
    dnt: '1'             // Do Not Track para privacidade
  });

  const src = `https://player.vimeo.com/video/${vimeoId}?${params.toString()}`;

  return (
    <div className="w-full">
      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700">
        <iframe
          src={src}
          width={width}
          height={height}
          className="w-full aspect-video rounded-xl"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
          title="Player de vídeo"
        />
        
        {/* Overlay decorativo sutil */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-transparent rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-blue-400/10 to-transparent rounded-full translate-x-12 translate-y-12"></div>
        </div>
      </div>
    </div>
  );
};

export default CourseVideoPlayerSimple;