import React, { useState, forwardRef } from 'react';
import { 
  ListItem, 
  ListItemAvatar, 
  Avatar, 
  ListItemText, 
  IconButton, 
  Link, 
  ListItemButton, 
  Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFetchData } from "../../custom_hooks/useFetch";
import { useFetchUrl } from "../../custom_hooks/useFetchUrl";
// import { useMatch } from 'react-router-dom';
import ElmSpinner from '../ElmSpinner/ElmSpinner';

const ForwardRefLink = forwardRef(
  (linkProps, ref) => (
  <Link ref={ref} to={linkProps.to} {...linkProps} />
)
);


function FavoritesItem({ location }) {

  // console.log('location sql data: ', location);
  const { data, loading, error } = useFetchData(location.fetch_url);
  // console.log('data: ', data);
  const [secondary, setSecondary] = useState(false);


  const details = `
  ${location.name} 
  ${data?.properties.periods[0].temperature}
  ${data?.properties.periods[0].temperatureUnit} 
  ${data?.properties.periods[0].shortForecast}`;

  // const path = `forecast/${JSON.stringify(location)}`;
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
        divider={true}
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => console.log('clicked!')}>
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
