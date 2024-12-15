import { useState, useEffect} from "react";
import { queryForecastData } from '../models/weather_api';

// fetches the current weather for a location with a url passed in.
export default function useFetchAllForecasts(urls) {
    const [state, setState] = useState({ data: null, loading: true, isError: false, error: {isError: false, message: ''} });

    useEffect(() => {
        function fetchAllData(urls) {
            let data = {
                urls: []
            };
            urls.forEach(async (url) => {
                const response = await queryForecastData(url);
                data.push(response);
            });
            setState({ data: data, loading: false, error: {isError: false, message: ''} });
        }

        if (urls !== null) {
            fetchAllData(urls);
        }
    }, [urls]);
    return state;
};