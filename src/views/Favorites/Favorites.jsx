import {useState, useEffect} from "react";
import { useLoaderData } from "react-router-dom";
import List from '@mui/material/List';
import ListCard from '../../components/ListCard/ListCard';
import { deleteFavorite } from '../../models/weather_api';
// import delete function


function Favorites() { 
    console.log('useLoaderData: ', useLoaderData());
    const { forecasts, sessionId } = useLoaderData();
    console.log('forecasts: ', forecasts[0].forecast.properties.periods[0].temperature);
    console.log('sessionId: ', sessionId);
    const [state, setState] = useState();

    console.log('state: ', state);
    const list = forecasts?.map((elm, i) => <ListCard key={i} data={elm} sessionId={sessionId} deleteFavorite={deleteFavorite} />);

    return (
        <List sx={{paddingTop: 0}}>
            {list}
        </List>
    );
}
export default Favorites;
