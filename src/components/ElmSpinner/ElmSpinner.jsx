import React from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import Box from '@mui/material/Box'


export default function ElmSpinner({color = 'primary', size = 'md'}) {

    return (
        <CircularProgress color={color} size={size} />
    )
}