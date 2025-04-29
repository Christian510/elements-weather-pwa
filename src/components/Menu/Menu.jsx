import { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material'

export default function ElmMenu() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Fragment>
      <Box
        id="elm-menu"
        sx={{ 
          width: 'inherit', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          textAlign: 'center' }}
        >
        <Typography>Elements Weather</Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 0 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ 
              width: 32, 
              height: 32, 
              borderStyle: 'solid', 
              borderWidth: '.15em', 
              borderColor: theme.palette.primary.light,
              backgroundColor: 'transparent' }}>
              <MoreHorizIcon 
                color='action'
                fontSize='medium'
                ></MoreHorizIcon>
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );
}

// import { useState, Fragment } from 'react';
// import { styled } from '@mui/system';
// import { IconButton, Box, Drawer, List, ListItem, ListItemButton, useTheme } from '@mui/material';
// import { NavLink } from 'react-router-dom';
// import MenuIcon from '@mui/icons-material/Menu';

// export default function Menu() {
//   const theme = useTheme();
//   const [state, setState] = useState({
//     top: false,
//     left: false,
//     bottom: false,
//     right: false,
//     user: 'Conrad',
//     loggedin: 0
//   });

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }
//     setState({ ...state, [anchor]: open });
//   };

//   const list = (anchor) => (
//     <Box
//       id="list-wrapper"
//       sx={{ 
//         height: '100%',
//         backgroundColor: theme.palette.grey[800],
//         width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 150,
//       }}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       <List id="nav-list">
//         {[{ label: 'Home', route: '/' }, { label: 'Create Account', route: '/create_account' }, { label: 'Login', route: '/login' }, { label: 'About', route: '/about' },].map((text, index) => (
//           <ListItem 
//             id={`label-${text.label}`}
//             key={text.label} disablePadding>
//             <ListItemButton>
//               <NavLink
//                 style={{
//                   color: theme.palette.common.white,
//                   textDecoration: "none",
//                 }}
//                 to={text.route}>{text.label}</NavLink>
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <NavBar 
//       id='navBar'
//       sx={{
//         height: "25%"
//       }}>
//       {['right'].map((anchor) => (
//         <Fragment key={anchor}>
//           <IconButton onClick={toggleDrawer(anchor, true)} area-label='menu' sx={{ color: theme.palette.white }} size='100px'>
//             <MenuIcon fontSize='inherit' />
//           </IconButton>
//           <Drawer
//             anchor={anchor}
//             open={state[anchor]}
//             onClose={toggleDrawer(anchor, false)}
//           >
//             {list(anchor)}
//           </Drawer>
//         </Fragment>
//       ))}
//     </NavBar>
//   );
// }

// const NavBar = styled('div')(`
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-end;
// `);