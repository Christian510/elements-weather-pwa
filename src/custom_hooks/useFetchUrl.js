import React, { useState, useEffect } from "react";
import { getForecastByLatLon } from '../models/weather_api';

// fetches a url from Weather.gov api for weather data.
export function useFetchUrl(loc) {
    const [state, setState] = useState({ url: null, fetching: true });

    // Retrieve the forecast url from the API.
    const fetchForecastUrl = async (l) => {

        const response = await getForecastByLatLon(l.lat, l.lng);
        setState({ url: response.properties.forecast, fetching: false });

    }
    useEffect(() => {
        setState( state => ({url: state.url, fetching: true}));
        if(loc !== null && loc !== undefined) {
            fetchForecastUrl(loc)
        }
        return () => {
            setState({ url: null, fetching: true });
        }
    }, []);
    return state;
};