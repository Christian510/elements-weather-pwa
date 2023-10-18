// import * as React from 'react';
import React, { useState, useRef } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import RtDrawer from '../Menu/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import SearchInput from '../MuiSearchBar/SearchWeatherByLocation';

export default function Header(props) {

  const { children } = props;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          { props.children }
        </Toolbar>
      </AppBar>
    </Box>
  );
}