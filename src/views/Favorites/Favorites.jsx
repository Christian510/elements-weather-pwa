import React, { useState, useEffect } from "react";
import List from '@mui/material/List';
import FavoritesItem from "../../components/FavoritesItem/FavoritesItem";
import axios from 'axios';

// Each list item is a card displays some basic weather about the locaiton.
// When the card is selected it passed the location obj along to get detailed weather and display.
// Or just display the error message in place of the list if no data is returned.

const fetchFavorites = async () => {
    try {
      const response = await axios.get('/favorites/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

function Favorites() {
    const sessionID = document.cookie.split('=')[1];
    // console.log('sessionId: ', sessionID);
    const [favorites, setFavorites] = useState([]);
    // console.log('favorites: ', favorites);
    
    useEffect(() => {
        async function fetchData() {
            const data = await fetchFavorites();
            setFavorites(data.locations);
        }
        fetchData();
    }, []);

    async function deleteFavorite(l_id, s_id) {
        // console.log('l_id: ', l_id);
        try {
            const response = await axios.delete(`/favorites/delete-one/?location_id=${l_id}&session_id=${s_id}`)
            // console.log('axios delete response: ', response);
            if (response.data.result === 1) {
                // console.log('response: ', response.data.result);
                setFavorites(favorites.filter((elm) => elm.location_id !== l_id));
            }
            if (response.data.result === 0) { // Maybe return a message if there is an error deleting the location.
                console.log('nothing deleted');
                return;
            }
        }
        catch (err) {
            console.log('error msg: ', err);
        }
    }
    // console.log("update: ", update);
    // console.log('favorites at Favorites.jsx: ', favorites);
    // console.log('error at Favorites.jsx: ', error);
    const list = favorites?.map((elm, i) => <FavoritesItem key={i} location={elm} sessionID={sessionID} deleteFavorite={deleteFavorite} />);
    return (
        <List>
            {list}
        </List>
    );
}
export default Favorites;
