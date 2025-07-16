import React from 'react';

interface CoursePlayerProps {
  videoUrl?: string;
  poster?: string;
  title?: string;
}

const CoursePlayer: React.FC<CoursePlayerProps> = ({ videoUrl, poster, title }) => {
  return (
    <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden flex items-center justify-center mb-6">
      {videoUrl ? (
        <video
          src={videoUrl}
          poster={poster}
          controls
          className="w-full h-full object-cover"
          title={title}
        />
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full text-white opacity-70">
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.868v4.264a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><rect width="20" height="14" x="2" y="5" rx="2" /></svg>
          <span className="mt-2 text-base">Vídeo não disponível</span>
        </div>
      )}
    </div>
  );
};

export default CoursePlayer; 