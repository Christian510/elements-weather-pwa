import React, {useState, useEffect} from 'react';

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