import React from 'react';
import CircularProgress from '@mui/joy/CircularProgress';


export default function ElmSpinner({color = 'primary', size = 'md'}, position = 'center-row') {

    return (
        <CircularProgress color={color} size={size} />
    )
}