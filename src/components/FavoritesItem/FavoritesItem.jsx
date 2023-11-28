import React, { useEffect, useState } from 'react';
import { 
  ListItem, 
  ListItemAvatar, 
  Avatar, 
  ListItemText, 
  IconButton, 
  Link, 
  ListItemButton, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFetchData } from "../../custom_hooks/useFetch";
import { useFetchUrl } from "../../custom_hooks/useFetchUrl";
import { useMatch } from 'react-router-dom';

const ForwardRefLink = React.forwardRef(
  (linkProps, ref) => (
  <Link ref={ref} to={linkProps.to} {...linkProps} />
)
);


function FavoritesItem({ location }) {
  // console.log('location: ', location);
  const { url, fetching } = useFetchUrl(location);
  // console.log('FavoritesItem : url: ', url);
  const { data, loading } = useFetchData(url);
  // console.log('data: ', data.properties?.periods[0]);
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);

  const match = useMatch('/:city');

  const [items, setItems] = useState({ 'name': '', 'temp': '', 'short_forecast': '', 'unit': '', 'icon': '' });

  useEffect(() => {
    setItems({
      'name': location.name,
      'temp': data?.properties.periods[0].temperature,
      'short_forecast': data?.properties.periods[0].shortForecast,
      'unit': data?.properties.periods[0].temperatureUnit,
      'icon': <img src={data?.properties.periods[0].icon} />
    });

  }, [data, setItems]);

  const details = `${items.name} ${items.temp}${items.unit} ${items.short_forecast}`;
  const path = `forecast/${JSON.stringify(location)}`;

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
          {items.icon}
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

export default FavoritesItem;
