import React from 'react';
import Image from 'next/image';

const HeroBadges: React.FC<{
  imageSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  label: string;
  subLabel: string;
  iconLabel?: React.ReactNode|string;
}> = ({ imageSrc, alt, width, height, className, label, subLabel, iconLabel }) => {
  return (
    <div className={`flex justify-center flex-col gap-3 bg-white rounded-xl shadow-lg px-5 min-w-[180px] ${className || ''}`}>
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          <Image
            src={imageSrc}
            alt={alt}
            width={width}
            height={height}
            style={{
              width: width ? `${width}px` : undefined,
              height: height ? `${height}px` : undefined,
            }}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-text-primary leading-none">
            {label} <span className="text-primary">{iconLabel || '+'}</span>
          </span>
          <span className="text-xs text-text-secondary leading-none">{subLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default HeroBadges; 