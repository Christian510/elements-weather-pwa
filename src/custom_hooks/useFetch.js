import { useState, useEffect } from "react";
import { fetchFavorites, getForecastByLatLon, queryForecastData } from './models/weather_api';

export function useFetchData() {

    const [state, setState] = useState({ data: null, loading: true, isError: false, error: {isError: false, message: ''} });

    useEffect(() => {
        async function fetchAllData() {
          try {
            let data = await fetchFavorites();
            data.locations.map(async (location) => {
              location.api = await getForecastByLatLon(location.lat, location.lng);
              location.forecast = await queryForecastData(location.api.properties.forecast);
            });
            setState({ data: data, loading: false });

          }
          catch (err) {
            console.log('error: ', err);
            setState({ data: null, loading: false, isError: true, error: {isError: true, message: err} });
          }
        }
        fetchAllData();
        // return () => {
        //     // console.log('unmounted!!!')
        //     setState({ data: null, loading: true });
        // }
    }, []);
    return state;
};