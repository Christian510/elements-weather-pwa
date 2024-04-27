import { DateRangeTwoTone } from "@mui/icons-material";
import axios from "axios";

export function procesFetch(url, options) {
    return fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unable to fetch data');
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

    return procesFetch(url, options);
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
    return procesFetch(url, options);
}

export async function fetchAllData(l) {
    try {
        const data = {}
        const api = await getForecastUrl(l.lat, l.lng);
        const forecast = await queryForecastData(api.properties.forecast);
        if (!forecast) { 
            throw new Error('Unable to fetch data');
        }
        else {
            // console.log('forecast: ', forecast);
            data.api = api;
            data.forecast = forecast;
            data.location = l;
            return data;
        }
    }
    catch (err) {
        console.log('Error message: ', err);
    }
  }
//   fetchAllData({lat: 48.27659, lng: -116.55325});


  
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
            return true;
        }
        if (response.data.result === 0) { // Maybe return a message if there is an error deleting the location.
            return false;
        }
    }
    catch (err) {
        console.log('error msg: ', err);
    }
}