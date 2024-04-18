import React, { useState, useEffect } from "react";
import List from '@mui/material/List';
import FavoritesItem from "../../components/FavoritesItem/FavoritesItem";
import axios from 'axios';
import ListCard from '../../components/ListCard/ListCard';
import { fetchFavorites } from "../../models/weather_api";

// Each list item is a card displays some basic weather about the locaiton.
// When the card is selected it passed the location obj along to get detailed weather and display.
// Or just display the error message in place of the list if no data is returned.

function Favorites() { 
    // const sessionID = document.cookie.split('=')[1];
    // console.log('sessionId: ', sessionID);
    const [favorites, setFavorites] = useState([]);
    const [sessionId, setSessionId] = useState();
    
    useEffect(() => {
        async function fetchData() {
            const data = await fetchFavorites();
            console.log('data: ', data);
            setFavorites(data.locations);
            setSessionId(data.session);
        }
        fetchData();
    }, []);

    async function deleteFavorite(l_id, s_id) {
        console.log('l_id: ', l_id);
        console.log('s_id: ', s_id);
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

    // <ListCard key={i} location={favorites} sessionId={sessionId} deleteFavorite={deleteFavorite} />
    const list = favorites?.map((elm, i) => <ListCard key={i} location={elm} sessionId={sessionId} deleteFavorite={deleteFavorite} />);
    return (
        <List sx={{paddingTop: 0}}>
            {list}
        </List>
    );
}
export default Favorites;
