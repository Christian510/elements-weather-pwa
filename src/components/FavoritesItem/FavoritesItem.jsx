import React, { useState, forwardRef } from 'react';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Link,
  ListItemButton,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFetchData } from "../../custom_hooks/useFetch";
import { useFetchUrl } from "../../custom_hooks/useFetchUrl";
import ElmSpinner from '../ElmSpinner/ElmSpinner';
import Axios from 'axios';

const ForwardRefLink = forwardRef(
  (linkProps, ref) => (
    <Link ref={ref} to={linkProps.to} {...linkProps} />
  )
);

// const deleteFavorite = (id, i) => {
//   // console.log('delete location by id: ', i);
//   Axios.delete(`/favorites/delete-one/?id=${i}`)
//     .then((response) => {
//       console.log('axios delete response: ', response.data.result);
//     }).catch((error) => {
//       console.log('error: ', error);
//     });
// }

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
              <img src={data?.properties.periods[0].icon} />
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
