'use client';
import React, { useRef, useEffect, useState } from 'react';
import Tooltip from './tooltip/Tooltip';

interface TruncatedTextProps {
  text: string;
  className?: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  maxLength?: number;
}

const TruncatedText: React.FC<TruncatedTextProps> = ({
  text,
  className = '',
  tooltipPosition = 'top',
  maxLength
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  // Processar texto se maxLength for fornecido
  const displayText = maxLength && text.length > maxLength 
    ? text.substring(0, maxLength) + '...'
    : text;

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        const element = textRef.current;
        setIsTruncated(element.scrollWidth > element.clientWidth);
      }
    };

    checkTruncation();
    
    // Recheck on window resize
    window.addEventListener('resize', checkTruncation);
    return () => window.removeEventListener('resize', checkTruncation);
  }, [text, maxLength]);

  return (
    isTruncated ? (
    <Tooltip content={text} position={tooltipPosition}>
      <span
        ref={textRef}
        className={`${className} block text-ellipsis overflow-hidden whitespace-nowrap`}
        title={text}
      >
        {displayText}
      </span>
    </Tooltip>
  ) : (
    <div className={`block`}>
      <span
        ref={textRef}
        className={`${className} block text-ellipsis overflow-hidden whitespace-nowrap`}
        title={text}
      >
        {displayText}
      </span>
    </div>
  )
);
};

export default TruncatedText; 