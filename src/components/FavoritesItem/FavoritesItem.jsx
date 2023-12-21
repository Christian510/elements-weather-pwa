import React, { useEffect, useState, forwardRef } from 'react';
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
  // console.log('location: ', location);
  // const { url, fetching } = useFetchUrl(location);
  // console.log('FavoritesItem : url: ', url);
  console.log('location sql data: ', location);
  const { data, loading } = useFetchData(location.fetch_url);
  console.log('data: ', data);
  // const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);

  let name = location.name;
  let temp = data?.properties.periods[0].temperature;
  let shortForecast = data?.properties.periods[0].shortForecast;
  let unit = data?.properties.periods[0].temperatureUnit;
  let icon = <img src={data?.properties.periods[0].icon} />;

  const details = `${name} ${temp}${unit} ${shortForecast}`;
  const path = `forecast/${JSON.stringify(location)}`;
console.log('path: ', path);
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
            {icon}
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
