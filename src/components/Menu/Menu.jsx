import { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Login from "@mui/icons-material/Login";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function ElmMenu({ onLoginClick }) {
  const theme = useTheme();
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLoginClick = () => {
    handleClose();
    onLoginClick();
  };

  const handleLogout = () => {
    handleClose();
    signOut();
  };

  const displayName = [profile?.firstName, profile?.lastName].filter(Boolean).join(' ') || user?.email || 'My account';
  const avatarInitial = profile?.firstName?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? null;

  return (
    <Fragment>
      <Box
        id="elm-menu"
        sx={{
          width: "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <Typography>Elements Weather</Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 0 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <PendingOutlinedIcon
              src={user?.photoURL ?? undefined}
              sx={{
                width: 32,
                height: 32,
                fontSize: "0.875rem",
              }}
            >
              {user ? (user.photoURL ? null : avatarInitial) : <MoreHorizIcon color="action" fontSize="medium" />}
            </PendingOutlinedIcon>
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
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => navigate('/user_account')} disabled={!user}>
          <Avatar src={user?.photoURL ?? undefined} sx={{ fontSize: "0.875rem" }}>
            {user?.photoURL ? null : avatarInitial}
          </Avatar>
          <Typography variant="body2" noWrap sx={{ maxWidth: 160 }}>
            {user ? displayName : 'My account'}
          </Typography>
        </MenuItem>
        <Divider />
        <NavLink to="/settings">
          <MenuItem
            sx={{
              color: theme.palette.common.white,
              textDecoration: "none",
            }}
            onClick={handleClose}
          >
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
        </NavLink>
        {user ? (
          <MenuItem
            sx={{ color: theme.palette.common.white }}
            onClick={handleLogout}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        ) : (
          <MenuItem
            sx={{ color: theme.palette.common.white }}
            onClick={handleLoginClick}
          >
            <ListItemIcon>
              <Login fontSize="small" />
            </ListItemIcon>
            Login
          </MenuItem>
        )}
      </Menu>
    </Fragment>
  );
}
