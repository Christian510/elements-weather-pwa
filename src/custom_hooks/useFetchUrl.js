import { useState, useEffect } from "react";
import { getForecastByLatLon } from '../models/weather_api';

// fetches a url from Weather.gov api for weather data.
export function useFetchUrl(loc) {
    // console.log('loc: ', loc);
    const [state, setState] = useState({ url: null, fetching: true });

    // Retrieve the forecast url from the API.
    const fetchForecastUrl = async (l) => {

        const response = await getForecastByLatLon(l.lat, l.lng);
        // console.log('response: ', response.properties.forecast)
        setState({ url: response.properties.forecast, fetching: false });

    }
    // console.log('url: ', state.url);
    useEffect(() => {
        // console.log('mounted!!!')
        setState( state => ({url: state.url, fetching: true}));
        if(loc !== null && loc !== undefined) {
            fetchForecastUrl(loc)
        }
        // console.log('state: ', state);
        return () => {
            // console.log('unmounted!!!')
            setState({ url: null, fetching: true });
        }
    }, []);
    // console.log('state: ', state);
    return state;
};