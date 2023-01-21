
// GET THE CURRENT WEATHER FORECAST FROM API
export function getWeatherByLatLon(lat, lon) {
    // const key = process.env.TOKEN1;
    
    let units = ['imperial', 'metric', 'standard'];
    const request = fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${key}&units=${units[0]}`)
    
    const key = process.env.TOKEN2;
    return request.then(function (response) {
            return response;
            })
            .catch(function (error) {
                console.log("API Error message: ");
                console.log(error);
            });
}

export function getWeatherByCity(city='denver,co') {
    // This will eventually need to be moved to an express server to protect the api key in .env.
    // const key = process.env.TOKEN1;
    const key1 = 'c0e279996283015fd597c2549bb99d2d';
    const key2 = '483d4bdaf7c3a0f5ee0c0297e784ecb5';
    const request = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key2}`);
    return request.then(function(response){
        const jsonPromise = response.json();
        jsonPromise.then(data => {
            console.log("data: ", data);
            return data;
        })
        .catch(error => {
            console.log(error);
        })
    })
}