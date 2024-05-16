import React, { useState, forwardRef } from 'react';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItem  from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFetchData } from "../../custom_hooks/useFetch";
import { useFetchUrl } from "../../custom_hooks/useFetchUrl";
import ElmSpinner from '../ElmSpinner/ElmSpinner';

const ForwardRefLink = forwardRef(
  (linkProps, ref) => (
    <Link ref={ref} to={linkProps.to} {...linkProps} />
  )
);

function FavoritesItem({ location, sessionID, deleteFavorite }) {
  // console.log('location: ', location);
  const { url } = useFetchUrl(location);
  const { data, loading, error } = useFetchData(url);
  const [secondary, setSecondary] = useState(false);

  const details = `
  ${location.name} 
  ${data?.properties.periods[0].temperature}
  ${data?.properties.periods[0].temperatureUnit} 
  ${data?.properties.periods[0].shortForecast}`;

  const path = `forecast/${encodeURIComponent(JSON.stringify(location))}`;
  // console.log('path: ', path);
  if (loading) {
    return (
      <FavoritesListItem
        divider={false}
        sx={{sxStyle}}>
        <ElmSpinner size='sm' />
      </FavoritesListItem>
    );
  }
  if (loading === false && error.isError === true) {
    return (
      <FavoritesListItem
        divider={false}
        sx={{sxStyle}}>
        <Typography variant='h6' color='error'>
          {error.message}
        </Typography>
      </FavoritesListItem>
    );
  } else {
    return (
      <FavoritesListItem
        className='favorite'
        sx={{backgroundColor: 'white'}}
        divider={false}
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => deleteFavorite(location.location_id, sessionID)}>
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemButton
          component={ForwardRefLink}
          to={path}
        >
          <ListItemAvatar>
            <Avatar
              variant='square'
              src={data?.properties.periods[0].icon} alt={data?.properties.periods[0].shortForecast}
              sx={{ width: 50, height: 50 }}
            />
              {/* <img src={data?.properties.periods[0].icon} alt={data?.properties.periods[0].shortForecast} /> */}
            {/* </Avatar> */}
          </ListItemAvatar>
          <ListItemText
            primary={details}
            secondary={secondary ? 'Location Missing' : null}
          />
        </ListItemButton>
      </FavoritesListItem>
    );
  }
}
const sxStyle = {
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}
const grey = {
  100: '#f5f5f5',
  200: '#eeeeee',
  300: '#e0e0e0',
  400: '#bdbdbd',
  500: '#9e9e9e',
  600: '#757575',
  700: '#616161',
  800: '#424242',
}
const FavoritesListItem = styled(ListItem)(
  ({ theme }) => `
    margin: 12px 0;
    border-radius: 12px;
    boarder: 4px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
`,
);

export default FavoritesItem;
