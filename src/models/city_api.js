// const  getForecastByLatLon = require('../models/weather_api') ;
import { getForecastByLatLon } from "./weather_api";

// GET A LIST OF CITIES BASED ON A QUERY STRING

// export class GeoLocation {
//     constructor(query, country = "US") {
//         this.query = query;
//         this.country = country;
//         // this.max_pop = maxPop;
//         // this.min_pop = minPop;
//     }

//     get cities() {
//         return this.queryCities()
//     }

//     queryCities() {
//         const options = {
//             method: 'GET',
//             // headers: {
//             // }
//         };

//         return fetch(`http://api.geonames.org/searchJSON?q=${this.query}&maxRows=10&username=${process.env.USER_NAME}`, options)
//             .then((response) => {
//                 if (response.ok) {
//                     // return response.json()
//                     console.log(response.json())
//                 } else {
//                     throw new Error("Oops, response failed!")
//                 }
//             })
//         // .then(data => data)
//         // .catch(err => console.error('Error msg: ', err));
//     }

// }

// Fetch a list of cities and locations.
export async function queryLocations(query, country = "US") {
    // console.log("query: ", query);
    const options = {
        method: 'GET',
        // headers: {
        //     'X-RapidAPI-Key': process.env.REACT_APP_GEODB_KEY,
        //     'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        // }
    };
    if (query.length === 0) {
        return [];
    } else {

        return await fetch(`http://api.geonames.org/searchJSON?name_startsWith=${query}&country=${country}&maxRows=10&username=christian510`, options)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Oops, response failed!")
                }
            })
            .then(data => data)
            .catch(err => console.error('Error msg: ', err));
    }
}

// Fetch the forecast data from url
export async function queryForecastData(url) {
    console.log('queryForecastData url: ', url);
    const options = {
        method: 'GET',
        // headers: {
        //     'X-RapidAPI-Key': process.env.REACT_APP_GEODB_KEY,
        //     'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        // }
    };
    return await fetch(url, options)
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("Oops, response failed!")
            }
        })
        .then(data => data)
        .catch(err => console.error('Error msg: ', err));
}

// Fetch a forecast location
export async function queryForecastUrl(l) {
    console.log('location: ', l)
    return await getForecastByLatLon(l.coords.lat, l.coords.lng)
    .then(resp => {
        if (resp.properties.forecast !== null) {
            console.log('queried url: ', resp.properties.forecast)
            return queryForecastData(resp.properties.forecast);
        }

    })
    .then(data => data)
    .catch(err => console.error('Eorror msg: ', err))
}


