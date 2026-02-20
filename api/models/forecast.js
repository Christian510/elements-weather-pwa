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


/*
OPTIONS FOR GENERATING A 'HIGH/LOW' FORECAST
You're right that the NWS API doesn't directly provide high/low temps in the forecast endpoint. Here are a few approaches to get daily highs and lows:

## 1. Parse from the forecast periods (recommended)

The `/forecast` endpoint gives you 12-hour periods (day/night). You can extract highs from daytime periods and lows from nighttime periods:

```javascript
const response = await fetch(`https://api.weather.gov/points/${lat},${lng}/forecast`);
const data = await response.json();

const periods = data.properties.periods;

// Group by day and extract high/low
const dailyTemps = periods.reduce((acc, period) => {
  const date = period.startTime.split('T')[0]; // Get YYYY-MM-DD
  
  if (!acc[date]) {
    acc[date] = { high: null, low: null };
  }
  
  if (period.isDaytime) {
    acc[date].high = period.temperature;
  } else {
    acc[date].low = period.temperature;
  }
  
  return acc;
}, {});
```

## 2. Use the hourly forecast endpoint

For more granular control, use `/forecast/hourly` and calculate the max/min yourself:

```javascript
const response = await fetch(`https://api.weather.gov/points/${lat},${lng}/forecast/hourly`);
const data = await response.json();

// Group hourly temps by day
const dailyHighsLows = data.properties.periods.reduce((acc, hour) => {
  const date = hour.startTime.split('T')[0];
  
  if (!acc[date]) {
    acc[date] = { temps: [] };
  }
  
  acc[date].temps.push(hour.temperature);
  
  return acc;
}, {});

// Calculate high/low for each day
Object.keys(dailyHighsLows).forEach(date => {
  const temps = dailyHighsLows[date].temps;
  dailyHighsLows[date] = {
    high: Math.max(...temps),
    low: Math.min(...temps)
  };
});
```

## 3. Use the gridpoint forecast (most detailed)

After getting the grid coordinates from `/points`, you can use `/gridpoints/{office}/{gridX},{gridY}` which includes more detailed data, though it's harder to parse.

The hourly forecast approach (#2) gives you the most accurate daily highs/lows since you're calculating from all 24 hours of data rather than just the 12-hour periods.
*/