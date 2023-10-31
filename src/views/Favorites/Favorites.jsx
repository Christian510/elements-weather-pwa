import React, { useEffect, useState } from "react";
import { Card, Link, List} from '@mui/material';
import {CardWithDrawer as FavoritesCard} from '../../components/ListCard/ListCard';
import favorites from "../../models/favorites.json";
import FavoritesItem from "../../components/FavoritesItem/FavoritesItem";



// Each list item is a card displays some basic weather about the locaiton.
// Card is also a button or link to the detailed weather view.
// When the card is selected it passed the location obj along to get detailed weather and display.
// 

function Favorites(props) {

    // console.log('favorites: ', favorites);
    const list = favorites.saved_locations.map(elm => <FavoritesItem key={elm.id} location={elm} />
    );

    return (
        <>
            <div>Favorite Locations</div>
            {/* <ul className="favorites">
                {list}
            </ul> */}
            {/* <FavoritesCard /> */}

            <List>
                {list}
            </List>

        </>
    );
}

export default Favorites;