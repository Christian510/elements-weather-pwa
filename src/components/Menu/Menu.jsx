import React from 'react';
import { styled } from '@mui/system';
import { IconButton, Box, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

export default function Menu() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
    user: 'Conrad',
    loggedin: 0
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 150 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[{ label: 'Home', route: '/' }, { label: 'Create Account', route: '/create_account' }, { label: 'Login', route: '/login' }, { label: 'About', route: '/about' },].map((text, index) => (
          <ListItem key={text.label} disablePadding>
            <ListItemButton>
              <NavLink to={text.route}>{text.label}</NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <NavBar id='navList'>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)} area-label='menu' sx={{ color: '#fff' }} size='100px'>
            <MenuIcon fontSize='inherit' />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </NavBar>

  );
}

const NavBar = styled('div')(`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`);