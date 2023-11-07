import React, { useEffect, useState } from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Link } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// import FolderIcon from '@mui/icons-material/Folder';
// import { Folder } from '@mui/icons-material';
import { useFetchData } from "../../custom_hooks/useFetch";
import { useFetchUrl } from "../../custom_hooks/useFetchUrl";
import { useMatch } from 'react-router-dom';

function FavoritesItem({ location }) {
    // console.log('forecast: ', location);
    const { url, fetching } = useFetchUrl(location);
    // console.log('FavoritesItem : url: ', url);
    const { data, loading } = useFetchData(url);
    // console.log('data: ', data.properties?.periods[0]);
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);

    const match = useMatch('/:city');

    const [items, setItems] = useState({'name': '', 'temp': '','unit': '', 'icon': ''});

    useEffect(() => {
    setItems({
        'name': location.name, 
        'temp': data?.properties.periods[0].temperature, 
        'unit': data?.properties.periods[0].temperatureUnit, 
        'icon': <img src={data?.properties.periods[0].icon} />
    });
        
    }, [data, setItems]);

    const details = `${items.name} ${items.temp} ${items.unit}`;
    const path = `weather-forecast/${JSON.stringify(location)}`;

    return (
        <ListItem
        secondaryAction={
          <IconButton 
          edge="end" 
          aria-label="delete" 
          onClick={() => console.log('clicked!')}>
            <DeleteIcon />
          </IconButton>
        }
      >
        <Link 
        to={'weather-forecast/:' + JSON.stringify(location)} 
        relative="path"
        onClick={() => console.log('Link clicked!!!', path)}
        >
            <ListItemAvatar>
            <Avatar>
                {/* <FolderIcon /> */}
                {items.icon}
            </Avatar>
            </ListItemAvatar>
            <ListItemText
            primary={details} // location.name
            secondary={secondary ? 'Location Missing' : null}
            />
        </Link>
      </ListItem>
    );
}

export default FavoritesItem;
