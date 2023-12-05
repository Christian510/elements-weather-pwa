import React from 'react';


export default function ElmImage({ src, alt, width, height, className }) {
    const name = `elm-image-${alt}`;
    return (
        <span className={name}>
            <img src={src} alt={alt} width={width} height={height} className={className} />
        </span>
    );
}