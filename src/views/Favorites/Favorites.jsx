import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import List from '@mui/material/List';
import ListCard from '../../components/ListCard/ListCard';
import { deleteFavorite } from '../../models/weather_api';

function Favorites() {
    const { forecasts, sessionId } = useLoaderData();
    const [favorites, setFavorites] = useState(forecasts)

    function handleDeleteFavorite(id, s_id) {
        console.log("Delete: ", id);
        deleteFavorite(id, s_id);
        setFavorites(preFavorites => preFavorites.filter((f) => f.location.location_id !== id));
    }

    const list = favorites?.map((elm) => <ListCard key={elm.location.location_id} id={`list-card_${elm.location.location_id}`} data={elm} sessionId={sessionId} handleDeleteFavorite={handleDeleteFavorite} />);
    return (
        <>
            {!favorites.length ? (
                <div>Loading...</div>
            ) : (
                <List sx={{ 
                    height: '90vh',
                    overflowY: 'auto',
                    scrollbarWidth: 'none',
                    }}>
                    {list}
                </List>
            )}
        </>
    )
}
export default Favorites;
