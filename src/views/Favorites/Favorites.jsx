import React, { useEffect, useState } from "react";
import { useLoaderData } from 'react-router-dom';
import { List } from '@mui/material';
// import favorites from "../../models/favorites.json";
import FavoritesItem from "../../components/FavoritesItem/FavoritesItem";



// Each list item is a card displays some basic weather about the locaiton.
// Card is also a button or link to the detailed weather view.
// When the card is selected it passed the location obj along to get detailed weather and display.

// Will receive a listof favorites from database.
// Passed from parent component.
// console.log('favorites: ', favorites);
// if no favorites display a default brand message such as the logo and a message to add favorites.

function Favorites() {
    
    const favorites = useLoaderData();
    console.log('favorites: ', favorites)

    const list = favorites.data?.map((elm, i) => <FavoritesItem key={i} location={elm} />);

    return (
        <List>
            {list}
        </List>
    );
}

export default Favorites;