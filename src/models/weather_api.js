
// const axios = require('axios');
// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;
// const { ObjectID } = require('mongodb');
// const { listenerCount } = require('process');

// GETS DATA FOR ONE CITY
// const getCityData = (sq, cb) => {
//     const db = getDb();
//     db
//         .collection('city_list')
//         .findOne({
//             $or: [{
//                 $and: [{ "name": sq.city }, { $or: [{ "state": sq.abbr }, { "country": sq.abbr }] }]
//             },
//             {
//                 $and: [{ "name": sq.city }, { "state": sq.state }, { "country": sq.country }]
//             }]
//         })
//         .then(result => {
//             if (result === null) {
//                 cb(null);
//             } else {
//                 cb(result);
//             }
//         })
//         .catch(err => {
//             console.log("err message: ", err);
//         });
// }
// LOOKS FOR A CITY BY ID IF EXISTS ELSE NULL
// const getSavedDataByID = (id, cb) => {
//     const db = getDb();
//     // Use async/await and return result and db.
//     db
//         .collection('saved_searches')
//         .findOne({ "_id": ObjectID(id) })
//         .then(result => {
//             cb(result);
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }


// GET WEATHER URL BY LAT AND LONG
export const getForecastByLatLon = async (lat, lon) => {
    // console.log('coords: ', lat + ':' + lng)
    // const key = process.env.REACT_APP_TOKEN1;
    // const key = process.env.REACT_APP_TOKEN2;
    const units = ['imperial', 'metric', 'standard'];
    // const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${key}&units=${units[0]}`;
    const url = `https://api.weather.gov/points/${lat},${lon}`;
    return await fetch(url)
    .then(response => {
        if (response.ok !== true) {
                // console.log('api resp: ', response)
                console.log('status:', response.status)
                console.log('error msg: ', response.statusText)
            }

            else {return response.json()}
        })
        .then(data => data)
        .catch(function (error) {
            console.log("API Error message: ");
            console.log(error);
        });
}

// GET WEATHER BY CITY NAME
export const getForecastByCity = async (search=null, countrycode='USA') => { /* In the future could default to a current geo-location */
    console.log("search param: ", search);
    let array;
    let city;
    if(search) {
        array = search.split(', ')
        city = array[0];
        
    } else {
        city = null;
    }
    const key = process.env.REACT_APP_TOKEN1;
    // const key = process.env.REACT_APP_TOKEN2;
    const units = ['imperial', 'metric', 'standard'];
    const url = `https://api.openweathermap.org/data/3/weather?q=${city},${countrycode}&appid=${key}&units=${units[0]}`;
    return await fetch(url)
                    .then((response) =>{ 
                        if(response.ok) {
                            return response.json()
                        } else {
                            throw new Error("Oops, response failed!")
                        }
                    })
                    .then( data => data)
                    .catch(function (error) {
                        console.log("Error Getting Weather Data: ");
                        console.log(error);
                    });
}

// RETURNS AN EXTENDED FORECAST FROM 1 TO 16 DAYS
export const getExtendedForecast = async (lat='', lon='', countrycode='USA') => {
    // api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
}


// export const getCityData = (city='', state='', country='US') => {
//     var headers = new Headers();
//     const key = process.env.REACT_APP_CITY_TOKEN;
//     headers.append("X-CSCAPI-KEY", key);

//     var requestOptions = {
//     method: 'GET',
//     headers: headers,
//     redirect: 'follow'
//     };
//     const url = `https://api.countrystatecity.in/v1/countries/${country}/cities`;
//     const fetchCitys = fetch(url, requestOptions);
//     return fetchCitys
//                 .then(response => response.json())
//                 .then( data => console.log(data))
//                 .catch( (error => {
//                     console.log('Error Getting City Data: ');
//                     console.log(error);
//                 }))
    
// }

// module.exports = class WeatherData {
//     constructor(id, city, state, lat, lon) {
//         this._id = id;
//         this.city = city;
//         this.state = state.toUpperCase();
//         this.visibile = true;
//         this.customName = null;
//         this.lat = lat;
//         this.lon = lon;
//     }

//     // SAVES WEATHER SEARCHES TO SESSION USER
//     save() {
//         const db = getDb();
//         this.visibile = false;
//         let weatherID = new mongodb.ObjectID();
//         return db.collection("sessions").updateOne(
//             { "_id": this._id },
//             {
//                 $push: {
//                     "savedSearches": {
//                         "id": weatherID,
//                         "state": this.state,
//                         "city": this.city,
//                         "lat": this.lat,
//                         "lon": this.lon,
//                         "customName": this.customName,
//                         "visible": this.visibile
//                     }
//                 }
//             })
//             .then(result => {
//                 console.log("Save Search Successful!");
//                 return result;
//             })
//             .catch(err => {
//                 console.log("Error Saving Search!")
//                 return err;
//             });
//     }
//     // DELETES ONE SAVED WEATHER STATION IF EXISTS
//     static delete(cityId, sessionId) {
//         const db = getDb();
//         const query = { '_id': sessionId }
//         const updateDoc = { $pull: { "savedSearches": { "id": ObjectID(cityId) } } };

//         return db.collection("sessions").updateOne(query, updateDoc)
//             .then(result => {
//                 if (result.deletedCount === 1) {
//                     console.log("Delete Successful!");
//                     console.log(result.deletedCount);
//                 }
//             })
//             .catch(err => {
//                 console.log("Delete not successful!")
//                 return err;
//             });
//     }

//     // EDITS THE NAME OF ONE SAVED WEATHER STATION
//     static editName(cityId, sessionId, newName) {
//         const db = getDb();
//         const query = { _id: sessionId, "savedSearches.id": ObjectID(cityId) };
//         const updateDoc = { $set: { "savedSearches.$.customName": newName } };
//         return db.collection("sessions").updateOne(query, updateDoc)
//             .then(result => {
//                 console.log(`Documents modified: ${result.modifiedCount}`);
//                 return result;
//             })
//             .catch(err => {
//                 return err;
//             })
//     }

//     // CHECKS TO MAKE SURE THE CITY EXISTS IN DB
//     static validateCity(sq, cb) {
//         getCityData(sq, cb);
//     }

//     // GETS WEATHER USING LATITUDE and LONGITUDE
//     static getWeather(lat, lon, cb) {
//         getWeatherForecast(lat, lon, cb);
//     }

//     // RETURNS A CITY IF IT EXISTS ELSE NULL
//     static getCityById(sq, cb) {
//         getCityData(sq, city => {
//             getSavedDataByID(city._id, cb);
//         });
//     }
//     // RETURNS A LIST OF SAVED CITIES BY SESSION ID
//     static getSessionById(id) {
//         const db = getDb();
//         return db
//             .collection('sessions')
//             .findOne({ "_id": id })
//             .then(result => {
//                 return result;
//             })
//             .catch(err => {
//                 // return err;
//                 console.log(err);
//             });
//     };
// }