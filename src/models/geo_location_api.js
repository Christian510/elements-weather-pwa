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

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const accuracy = position.coords.accuracy;
    const timestamp = position.timestamp;
  
    // You can now use the retrieved coordinates and other location data
    // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    // console.log(`Accuracy: ${accuracy} meters`);
    // console.log(`Timestamp: ${timestamp}`);
  
    // Example: Displaying the location on a map
    // const mapLink = `https://www.google.com/maps/@${latitude},${longitude},15z`;
    // const mapElement = document.getElementById("map");
    // mapElement.innerHTML = `<a href="${mapLink}" target="_blank">View location on map</a>`;
  }
  
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.error("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.error("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.error("The request to get user location timed out.");
        break;
      default:
        console.error("An unknown error occurred.");
    }
  }
  
  // Call the function to get user location
  getLocation();
  