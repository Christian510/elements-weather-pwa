import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';


export default function ElmSpinner({color = 'primary', size = '40px', thickness = 4}) {
    console.log('element spinner');
    return (
        <CircularProgress color={color} size={size} thickness={thickness} />
    )
}