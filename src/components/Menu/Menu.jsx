import { useState, Fragment } from 'react';
import { styled } from '@mui/system';
import { IconButton, Box, Drawer, List, ListItem, ListItemButton, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

export default function Menu() {
  const theme = useTheme();
  const [state, setState] = useState({
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
      sx={{ 
        height: '100%',
        backgroundColor: theme.palette.primary.light,
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 150,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[{ label: 'Home', route: '/' }, { label: 'Create Account', route: '/create_account' }, { label: 'Login', route: '/login' }, { label: 'About', route: '/about' },].map((text, index) => (
          <ListItem 
            id={`label-${text.label}`}
            key={text.label} disablePadding>
            <ListItemButton>
              <NavLink
                style={{
                  color: theme.palette.common.black,
                  textDecoration: "none",
                }}
                to={text.route}>{text.label}</NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <NavBar id='navList'>
      {['right'].map((anchor) => (
        <Fragment key={anchor}>
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
        </Fragment>
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