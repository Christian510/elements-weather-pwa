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

// Fetch the forecast for by url
export async function queryForecastData(url) {
    const response = await fetch(url)
    .then(resp => {
        if(resp.ok) {
            return resp.json();
        } else {
            throw new Error("Oops, response failed!")
        }
    })
    .then(data => data)
    .catch(err => console.error('Error msg: ', err));
}

// Fetch the forecast for a location
export async function queryForecastUrl(l) {
    const response = await getForecastByLatLon(l.coords.lat, l.coords.lng);
    console.log('forecast resp: ', response.properties.forecast)

    if (response.status === 200 && response.properties.forecast !== null) {
        return queryForecastData(response.properties.forecast);
    }
}


