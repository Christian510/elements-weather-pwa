// import * as React from 'react';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';


// Redesign the header.
// Fix margins.

export default function Header(props) {

  const { children } = props;
  return (
    // <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          { props.children }
        </Toolbar>
      </AppBar>
    // </Box>
  );
}