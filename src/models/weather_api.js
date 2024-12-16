// import { DateRangeTwoTone } from "@mui/icons-material";
import axios from "axios";

export function processFetch(url, options) {
    return fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return null;
            }
        })
        .catch(err => console.error('Error message: ', err));
}

export const fetchFavorites = async () => {
    const baseUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000'
    : 'http://localhost:8080';
    console.log('baseUrl: ', baseUrl);
    return axios.get(`${baseUrl}/favorites/all`)
    .then(response => {
        console.log('response: ', response);
        return response.data;
    })
    .catch(error => {
        console.error('Error fetching data: ', error);
    });
  };

// GET WEATHER URL BY LAT AND LONG
export const getForecastUrl = (lat, lng) => {
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
    const options = {
        'method': 'GET',
        'mode': 'cors',
        'headers': {
            'Accept': 'application/json'
        }
    };
    return processFetch(url, options);
}

export function fetchHourlyForecast(url) {
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
    const url = `http://api.geonames.org/timezoneJSON?formatted=true&lat=${lat}&lng=${lng}&username=${process.env.REACT_APP_USER_NAME}`;
    return processFetch(url, options);
  }

export async function fetchAllData(l) {
    const data = {}
    try {
        data.location = l;
        const api = await getForecastUrl(l.lat, l.lng);
        data.api = api;
        const forecast = await queryForecastData(api.properties.forecast);
        data.forecast = forecast;
        const hourlyForecast = await fetchHourlyForecast(api.properties.forecastHourly);
        data.hourlyForecast = hourlyForecast;
        const dateTime = await fetchDateTime(l.lat, l.lng);
            data.dateTime = dateTime;
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

  export const addFavorite = async (data, session_id) => {
    const params = {
        location_id: data.location_id,
        name: data.name,
        state: data.state,
        country_code: data.country_code,
        lat: data.lat,
        lng: data.lng,
        session_id: session_id
    } 
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