import React, { useEffect, useState } from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
// import { Folder } from '@mui/icons-material';
import { useFetchData } from "../../custom_hooks/useFetch";
import { useFetchUrl } from "../../custom_hooks/useFetchUrl";

function FavoritesItem({ location }) {
    console.log('forecast: ', location);
    const { url, fetching } = useFetchUrl(location);
    const { data, loading } = useFetchData(url);
    console.log('data: ', data);
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);
    const [itemDetails, setItemDetails] = useState({
        'name': location.name, 
        'temp': `${data.properties.periods[0].temperature} ${data.properties.periods[0].temperatureUnit}`,
        'icon': data.properties.periods[0].icon,
    });
    const details = `${itemDetails.name} ${itemDetails.temp}}`;
    return (
        <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
            {/* {location.icon} */}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={details} // location.name
          secondary={secondary ? 'Location Missing' : null}
        />
      </ListItem>
    );
}

export default FavoritesItem;
