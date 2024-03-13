import React, { useState, forwardRef } from 'react';
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
  const { url, fetching } = useFetchUrl(location);
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
      <ListItem
        divider={true}
        sx={
          {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }
        }>
        <ElmSpinner size='sm' />
      </ListItem>
    );
  }
  if (loading === false && error.isError === true) {
    return (
      <ListItem
        divider={true}
        sx={
          {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }
        }>
        <Typography variant='h6' color='error'>
          {error.message}
        </Typography>
      </ListItem>
    );
  } else {
    return (
      <ListItem
        className='favorite'
        divider={true}
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
            <Avatar>
              <img src={data?.properties.periods[0].icon} alt={data?.properties.periods[0].shortForecast} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={details}
            secondary={secondary ? 'Location Missing' : null}
          />
        </ListItemButton>
      </ListItem>
    );
  }
}

export default FavoritesItem;
