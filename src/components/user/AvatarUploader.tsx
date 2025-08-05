'use client';

import React, { useRef } from 'react';

interface AvatarUploaderProps {
  avatarUrl?: string;
  onChange?: (file: File | null) => void;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({ avatarUrl, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (onChange) onChange(file);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <img
          src={avatarUrl || '/images/brand/berkana_logo.svg'}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover border-2 border-primary bg-white"
        />
        <button
          type="button"
          className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 shadow hover:bg-primary/90 transition-colors"
          onClick={() => inputRef.current?.click()}
          aria-label="Alterar avatar"
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2a2.828 2.828 0 11-4-4 2.828 2.828 0 014 4z" /></svg>
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      {avatarUrl && (
        <button
          type="button"
          className="text-xs text-error hover:underline mt-1"
          onClick={() => onChange && onChange(null)}
        >
          Remover avatar
        </button>
      )}
    </div>
  );
};

export default AvatarUploader; 