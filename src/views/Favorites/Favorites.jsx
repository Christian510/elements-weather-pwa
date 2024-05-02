import {useState, useEffect} from "react";
import { useLoaderData } from "react-router-dom";
import List from '@mui/material/List';
import ListCard from '../../components/ListCard/ListCard';
import { deleteFavorite } from '../../models/weather_api';
// import delete function


function Favorites() { 
    const { forecasts, sessionId } = useLoaderData();
    // console.log('forecasts: ', forecasts);
    // const [state, setState] = useState();
    // console.log('state: ', state);
    if ( forecasts.length === 0 ) {
        return (
            <div>Loading...</div>
        )
    } else {
        const list = forecasts?.map((elm, i) => <ListCard key={i} data={elm} sessionId={sessionId} deleteFavorite={deleteFavorite} />);
        return (
            <List sx={{paddingTop: 0}}>
                {list}
            </List>
        );
    }
}
export default Favorites;
