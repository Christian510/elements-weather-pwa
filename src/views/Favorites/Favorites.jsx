import React, { useState, useEffect } from "react";
import { List } from '@mui/material';
import FavoritesItem from "../../components/FavoritesItem/FavoritesItem";
// import useFetchFavorites from "../../custom_hooks/useFetchFavorites";
import axios from 'axios';
// import { fetchFavorites } from "../../models/weather_api";

// Each list item is a card displays some basic weather about the locaiton.
// When the card is selected it passed the location obj along to get detailed weather and display.
// Or just display the error message in place of the list if no data is returned.

const deleteFavoriteFromDB = (l_id, s_id) => {
    console.log(`delete location by id: ${l_id} & session: ${s_id}`);
    axios.delete(`/favorites/delete-one/?location_id=${l_id}&session_id=${s_id}`)
        .then((response) => {
            console.log('axios delete response: ', response.data.result);
            // delete from the list and update the list. Maybe use state?
            // setUpdate(update + 1);
        }).catch((error) => {
            console.log('error: ', error);
        });
}

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
    console.log('sessionId: ', sessionID);
    // const { data, error } = useFetchFavorites();
    // const [update, setUpdate] = useState(0);
    const [favorites, setFavorites] = useState([]);

    console.log('favorites: ', favorites);
    
    useEffect(() => {
        async function fetchData() {
            const data = await fetchFavorites();
            setFavorites(data.locations);
        }
        fetchData();
    }, []);

    async function deleteFavorite(l_id, s_id) {
        // console.log('l_id: ', l_id);
        // setFavorites(favorites.filter((elm) => elm.location_id !== l_id));
        try {
            const result = await axios.delete(`/favorites/delete-one/?location_id=${l_id}&session_id=${s_id}`)
            if (result.affectedRows === 1) {
                console.log('delete location by id: ', l_id);
                // console.log('result: ', result);
                // setUpdate(update + 1);
                setFavorites(favorites.filter((elm) => elm.location_id !== l_id));
            }
            if (result.affectedRows === 0) { // Maybe return a message if there is an error deleting the location.
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
