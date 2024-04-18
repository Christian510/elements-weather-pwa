import { useState, useEffect } from "react";
import { getForecastByLatLon } from '../models/weather_api';

// fetches a url from Weather.gov api for weather data.
export default function useFetchAllUrls(locations) {
    console.log('loc: ', locations);
    const [state, setState] = useState({ urls: null, fetching: true });

    // Retrieve the forecast urls from the API.
    const fetchData = async (l) => {
        let urls = [];
        l.forEach(async (loc) => {
            const response = await getForecastByLatLon(loc.lat, loc.lng);
            urls.push(response.properties.forecast);
        });

        setState({ urls: urls, fetching: false });

    }
    // console.log('url: ', state.url);
    useEffect(() => {
        // console.log('mounted!!!')

        // setState( state => ({url: state.url, fetching: true}));
        if(locations !== null && locations !== undefined) {
            fetchData(locations)
        }
        // console.log('state: ', state);
        return () => {
            // console.log('unmounted!!!')
            setState({ url: null, fetching: true });
        }
    }, []);
    console.log('state: ', state);
    return state;
};