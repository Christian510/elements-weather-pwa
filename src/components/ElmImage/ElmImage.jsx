import {useState, useEffect} from 'react';

export default function ElmImg({ src, alt, width, height, onError, ...otherProps }) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const img = new Image();
      img.onload = () => setLoaded(true);
      img.onerror = (err) => setError(err);
      img.src = src;
    }, [src]);
    console.log('error: ', error);
    
    return (
      <img
        src={loaded ? src : ''}
        alt={alt}
        width={width}
        height={height}
        onError={onError}
        {...otherProps}
      />
    );
  }

  /**
   * Preformance update
   * import React, { useState, useEffect, useCallback } from 'react';

const ElmImg = React.memo(({ src, alt, width, height, onError, ...otherProps }) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);

    const handleLoad = useCallback(() => setLoaded(true), []);
    const handleError = useCallback((err) => {
        setError(err);
        onError?.(err);
    }, [onError]);

    useEffect(() => {
        const img = new Image();
        img.onload = handleLoad;
        img.onerror = handleError;
        img.src = src;

        return () => {
            img.onload = null;
            img.onerror = null;
            img.src = '';
        };
    }, [src, handleLoad, handleError]);

    if (process.env.NODE_ENV !== 'production') {
        console.log('error: ', error);
    }

    return (
        <img
            src={loaded ? src : ''}
            alt={alt}
            width={width}
            height={height}
            {...otherProps}
        />
    );
});

export default ElmImg;

   */