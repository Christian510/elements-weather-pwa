
import axios from "../api/client";
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
    return axios.get(`/favorites/all`)
    .then(response => {
        if (typeof response.data === 'string') {
            return [];
        }
        return response.data;
    })
    .catch(error => {
        console.error('Error fetching data: ', error);
    });
  };

// GET WEATHER URL BY LAT AND LONG
export const getForecastUrl = (lat, lng) => {
    fetchObservationData(lat, lng);

    // const units = ['imperial', 'metric', 'standard'];
    const url = `https://api.weather.gov/points/${lat},${lng}`;
    const options = {
        'method': 'GET',
        'mode': 'cors',
        'headers': {
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
    const geonamesUrl = process.env.REACT_APP_GEONAMES_URL;
    const username = process.env.REACT_APP_GEONAMES_USER_NAME;
    const url = `${geonamesUrl}/timezoneJSON?formatted=true&lat=${lat}&lng=${lng}&username=${username}`;
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
        console.error('Error message: ', err);
    }
    return data;
}

export async function fetchObservationData(lat, lng) {
    /*
        1. Get Your Grid Point (One-Time Setup)
        First, convert your lat/lon to a grid point:
        GET https://api.weather.gov/points/{latitude},{longitude}
        Example:
        https://api.weather.gov/points/39.7456,-97.0892
        This returns a JSON response. Grab gridId, gridX, and gridY from it.

        2. Fetch Observations from the Nearest Station
        The gridded forecast doesn't include humidity/dewpoint/pressure directly — you need observation stations instead.
        Step 1 – Get nearby stations:
        GET https://api.weather.gov/points/{lat},{lon}/observationStations
        Grab the first station ID from features[0].properties.stationIdentifier (e.g., KOKC).
        Step 2 – Get latest observation:
        GET https://api.weather.gov/stations/{stationId}/observations/latest
    */

    const options = {
        'method': 'GET',
        'mode': 'cors',
        'headers': {
            'Accept': 'application/json'
        }
    };
  // Step 1: Get grid point info
  const pointsRes = await fetch(`https://api.weather.gov/points/${lat},${lng}`, { options });
  const pointsData = await pointsRes.json();
  console.log('data: ', pointsData);
  const forecastUrl = pointsData.properties.forecast;
  const forecast = await fetch(forecastUrl, { options });
  console.log('forecast: ', forecast);

  const observationStationsUrl = pointsData.properties.observationStations;

  // Step 2: Get nearest observation station
  const stationsRes = await fetch(observationStationsUrl, { options });
  const stationsData = await stationsRes.json();
  const stationId = stationsData.features[0].properties.stationIdentifier;

  console.log(`Using station: ${stationId}`);

  // Step 3: Get latest observation
  const obsRes = await fetch(`https://api.weather.gov/stations/${stationId}/observations/latest`, { options });
  const obsData = await obsRes.json();
  const props = obsData.properties;

  // Extract and convert values
  const humidity   = props.relativeHumidity?.value;
  const dewpointC  = props.dewpoint?.value;
  const dewpointF  = dewpointC != null ? (dewpointC * 9/5 + 32).toFixed(1) : null;
  const pressurePa = props.barometricPressure?.value;
  const pressureMb = pressurePa != null ? (pressurePa / 100).toFixed(1) : null;

  console.log(`Humidity:  ${humidity}%`);
  console.log(`Dewpoint:  ${dewpointC}°C / ${dewpointF}°F`);
  console.log(`Pressure:  ${pressureMb} mb`);

  return { humidity, dewpointC, dewpointF, pressureMb };


}
 
// RETURNS AN EXTENDED FORECAST FROM 1 TO 16 DAYS
export const fetchExtendedForecast = async (lat = '', lon = '', countrycode = 'USA') => {
    // api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
}

export const fetchWeatherAlerts = async (locations) => {
    // https://api.weather.gov/alerts/active?area={state}
};

//   export const fetchUrl = async (locations) => {};

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
        const response = await axios.post(`/favorites/add-one`, params)
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
        console.error('error msg: ', err);
    }
}