import React from "react";
import { List } from '@mui/material';
import FavoritesItem from "../../components/FavoritesItem/FavoritesItem";
import useFetchFavorites from "../../custom_hooks/useFetchFavorites";

// Each list item is a card displays some basic weather about the locaiton.
// When the card is selected it passed the location obj along to get detailed weather and display.
// Or just display the error message in place of the list if no data is returned.

function Favorites() {
    const { favorites, error } = useFetchFavorites();

    console.log('favorites at Favorites.jsx: ', favorites);
    // console.log('error at Favorites.jsx: ', error);
    const list = favorites?.map((elm, i) => <FavoritesItem key={i} location={elm} error={error} />);

    return (
        <List>
            {list}
        </List>
    );
}

export default Favorites;
