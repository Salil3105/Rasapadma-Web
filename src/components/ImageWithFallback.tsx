import React, { useState, useEffect } from 'react';

const PLACEHOLDER_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%23e2e8f0' width='400' height='400'/%3E%3Cg fill='%2394a3b8'%3E%3Cpath d='M200 120c-44 0-80 36-80 80s36 80 80 80 80-36 80-80-36-80-80-80zm0 128c-26 0-48-22-48-48s22-48 48-48 48 22 48 48-22 48-48 48z'/%3E%3Ccircle cx='200' cy='200' r='40'/%3E%3Cpath d='M280 280l60 60 40-40'/%3E%3C/g%3E%3C/svg%3E";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ 
  src, 
  alt, 
  fallbackSrc = PLACEHOLDER_SVG, 
  className = '', 
  ...props 
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};
