import { DateRangeTwoTone } from "@mui/icons-material";
import axios from "axios";

export function processFetch(url, options) {
    return fetch(url, options)
        .then(response => {
            // console.log("fetch response: ", response);
            if (response.ok) {
                return response.json();
            } else {
                // throw new Error('Unable to fetch data');
                return null;
            }
        })
        .catch(err => console.error('Error message: ', err));
}

export const fetchFavorites = async () => {
    return axios.get('/favorites/all')
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.error('Error fetching data: ', error);
    });
  };

// GET WEATHER URL BY LAT AND LONG
export const getForecastUrl = (lat, lng) => {
    // console.log('coords: ', lat + ':' + lng)
    // const units = ['imperial', 'metric', 'standard'];
    const url = `https://api.weather.gov/points/${lat},${lng}`;
    const options = {
        'method': 'GET',
        'mode': 'cors',
        'headers': {
        //     'Access-Control-Allow-Origin': '*',
        //     'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    return processFetch(url, options);
}

// Fetch the forecast data from url
export function queryForecastData(url) {
    // console.log('ForecastData: ', url);
    const options = {
        'method': 'GET',
        'mode': 'cors',
        'headers': {
            'Accept': 'application/json'
        }
    };
    return processFetch(url, options);
}

// Fetch Date and Time for a city or location
export async function fetchDateTime(lat, lng, country="US") {
    const options = {
        'method': 'GET',
        'mode': 'cors',
        'headers': {
            'Accept': 'application/json'
        }
    };
    return processFetch(`http://api.geonames.org/timezoneJSON?formatted=true&lat=${lat}&lng=${lng}&username=christian510`, options);
  }

export async function fetchAllData(l) {
    // console.log('location: ', l)
    const data = {}
    try {
        data.location = l;
        const api = await getForecastUrl(l.lat, l.lng);
        if (api === null) {
            data.api = null;
            data.forecast = null;
            throw new Error('Unable to fetch api urls');
        }

        const forecast = await queryForecastData(api.properties.forecast);
        if (forecast === null) { 
            data.forecast = null;
            throw new Error('Unable to fetch forecast');
        }

        const dateTime = await fetchDateTime(l.lat, l.lng);
        if (dateTime === null) {
            console.log("NO DATE-TIME!!!!!")
            data.dateTime = null;
            throw new Error('Unable to fetch dateTime');
        }
        else {
            data.dateTime = dateTime;
            data.api = api;
            data.forecast = forecast;
            // console.log('data: ', data);
        }
    }
    catch (err) {
        console.log('Error message: ', err);
    }
    return data;
}
 
// RETURNS AN EXTENDED FORECAST FROM 1 TO 16 DAYS
export const fetchExtendedForecast = async (lat = '', lon = '', countrycode = 'USA') => {
    // api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
}

export const fetchWeatherAlerts = async (locations) => {
    // https://api.weather.gov/alerts/active?area={state}
};


  export const fetchUrl = async (locations) => {};


  export const addFavorite = async (params) => {
    try {
        const response = await axios.post('/favorites/add-one', params)
        return response.data;
    } catch (error) {
        console.error('Error adding favorite: ', error);
    }
}

export const deleteFavorite = async (l_id, s_id) => {
    try {
        const response = await axios.delete(`/favorites/delete-one/?location_id=${l_id}&session_id=${s_id}`)
        if (response.data.result === 1) {
            // console.log('Delete Success!!', response)
            return true;
        }
        if (response.data.result === 0) { // Maybe return a message if there is an error deleting the location.
            // console.error('Delete failed!!', response)
            return false;
        }
    }
    catch (err) {
        console.log('error msg: ', err);
    }
}