import React from "react";
// import { styled } from "@mui/material/styles";



export default function ElmImg({src, priority, alt, loading, width, height, layout, quality}) {
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      width={width}
      height={height}
      layout={layout}
      quality={quality}
    />
  );
}
