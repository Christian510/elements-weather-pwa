const axios = require('axios');
// const getDb = require('../util/database').getDb;
// const { listenerCount } = require('process');

// export class Forecast {
//     constructor(lat, lon, city, state, country='US', forecast, url) {
//         this.city = city;
//         this.state = state;
//         this.country = country;
//         this.forecast = forecast;
//         this.url = url;
//     }

//     save() {}

//     static fetchCurrentForecast() {}
//     static fetchExtendedForecast() {}
//     static fetchSavedLocations() {}

//     static saveLocation() {}
//     static updateLocation() {}
//     static deleteSavedLocation() {}

// }
// GET WEATHER URL BY LAT AND LONG
export const getForecastByLatLon = async (lat, lng) => {
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
    return await fetch(url, options)
        .then(response => {
            // console.log('response: ', response);
            if (response.ok !== true) {
                // console.log('status:', response.status)
                // console.log('body:', response.body);
                // throw new Error('Unable to get forecast data');
                return null;
            }

            else {
                return response.json()
            }
        })
        .then(data => data)
        .catch(function (error) {
            console.log("API Error message: ");
            console.log(error);
        });
}

// Fetch the forecast data from url
export async function queryForecastData(url) {
    console.log('ForecastData: ', url);
    const options = {
        'method': 'GET',
        'mode': 'cors',
        'headers': {
            'Accept': 'application/json'
        }
    };
    return await fetch(url, options)
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("Oops, response failed!")
            }
        })
        .then(data => {
            return data
        })
        .catch(err => console.error('Error msg: ', err));
}


// RETURNS AN EXTENDED FORECAST FROM 1 TO 16 DAYS
export const getExtendedForecast = async (lat = '', lon = '', countrycode = 'USA') => {
    // api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
}

export const fetchFavorites = async () => {
    try {
      const response = await axios.get('/favorites/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };