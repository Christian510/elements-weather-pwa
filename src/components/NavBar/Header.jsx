import React from 'react';
import { styled } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

export default function Header(props) {
  console.log('props: ', props);
  // const { children } = props;
  return (
      <AppBar id="header" position="sticky" sx={headerStyles}>
        <Toolbar sx={toolBarStyles}>
          { props.children }
        </Toolbar>
      </AppBar>
  );
}
const grey = {
  50: '#f7f7f7',
  100: '#eeeeee',
  200: '#e1e1e1',
  300: '#cfcfcf',
  400: '#aaaaaa',
  500: '#898989',
  600: '#626262',
  700: '#4f4f4f',
  800: '#313131',
  900: '#111111',
};

const headerStyles  = {
  minHeight: '10vh',
  backgroundColor: grey[900],
  opacity: 0.9,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  paddingRight: '0px',
  paddingLeft: '0px',
}

const toolBarStyles = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingLeft: '0px',
  paddingRight: '0px',
}