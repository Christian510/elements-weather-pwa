const db = require('../db/database');
// import { db } from '../db/database.js';

export class Forecast {
    constructor(lat, lon, city, state, country, forecast, url) {
        this.lat = lat;
        this.lon = lon;
        this.city = city;
        this.state = state;
        this.country = country;
        this.forecast = forecast;
        this.url = url;
    }

    save() {
        db.execute('SELECT * FROM sessions WHERE session_id = ?')
    }
    update() {}
    delete() {}

    static fetchCurrentForecast() {}
    static fetchExtendedForecast() {}
    static fetchSavedLocations() {}

    static saveLocation() {}
    static updateLocation() {}
    static deleteSavedLocation() {}

}
// GET THE WEATHER URL WITH LAT AND LONG
export const fetchForecastUrls = async (lat, lng) => {
    // const units = ['imperial', 'metric', 'standard'];
    const url = `https://api.weather.gov/points/${lat},${lng}`;
    return await fetch(url)
    .then(response => {
        if (response.ok !== true) {
                console.log('status:', response.status)
                console.log('error msg: ', response.statusText)
            }
            
            else {
                return response.json()
            }
        })
        .then(data => data) // parse this out into the forecast url and the hourly forecast url.
        .catch(function (error) {
            console.log("API Error message: ");
            throw new Error('Unable to fetch forecast data: ', error);
        });
}

// Fetch the forecast data from url
export async function fetchForecast(url) {
    const options = {
        method: 'GET',
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

// export const fetchHourlyForecastUrl = async (lat, lng) => {
//     // console.log('coords: ', lat + ':' + lng)
//     // get the 
//     const url = `https://api.weather.gov/points/${lat},${lng}/forecast`;
//     return await fetch(url)
//     .then(response => {
//         if (response.ok !== true) {
//                 console.log('status:', response.status)
//                 console.log('error msg: ', response.statusText)
//             }
            
//             else {
//                 return response.json()
//             }
//         })
//         .then(data => data)
//         .catch(function (error) {
//             console.log("API Error message: ");
//             console.log(error);
//         });
// }
// // RETURNS AN EXTENDED FORECAST FROM 1 TO 16 DAYS
// export const fetchHourleyForecast = async (url) => {
//     // api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
// }