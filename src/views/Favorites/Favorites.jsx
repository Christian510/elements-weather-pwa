import React, { useEffect, useState } from "react";
import { List } from '@mui/material';
import FavoritesItem from "../../components/FavoritesItem/FavoritesItem";
import useFetchFavorites from "../../custom_hooks/useFetchFavorites";
import Axios from 'axios';

// Each list item is a card displays some basic weather about the locaiton.
// When the card is selected it passed the location obj along to get detailed weather and display.
// Or just display the error message in place of the list if no data is returned.

const deleteFavorite = (id, i) => {
    console.log(`delete location by id: ${id} & index: ${i}`);
    // Axios.delete(`/favorites/delete-one/?id=${i}`)
    //   .then((response) => {
    //     console.log('axios delete response: ', response.data.result);
    //   }).catch((error) => {
    //     console.log('error: ', error);
    //   });
  }

function Favorites() {
    const { favorites, error } = useFetchFavorites();

    console.log('favorites at Favorites.jsx: ', favorites);
    // console.log('error at Favorites.jsx: ', error);
    const list = favorites?.map((elm, i) => <FavoritesItem key={i} location={elm} index={i} />);

    return (
        <List>
            {list}
        </List>
    );
}

export default Favorites;
