*** TODOS
[] Add sessions to server.
[] Create local db for saved forecast locations.
[] Create Sessions db.
[] DB for historical forecast data.
[] Secure Login form
[] Figure out how to test app on phone.
[] Rename ForecastView to CurrentConditionsView
[] Convert to production:
    [] host.
    [] remote db
    [] PWA process
[] Before production remove all dev console logs
[] NEED TO WORK ON A WAY TO FILTER OPTIONS LIST AS THE USER TYPES TO CONTINUE NARROWING THE OPTIONS
[] Save the sessionID as the User name.
[] Save the city forecast data with the sessionID.
[] {name: sessionID, locations: {index1{name: 'city', state', coords{lat: 123, lng: 123}}, index2{name: 'city', state', coords{lat: 123, lng: 123}}}}
[] Users session will last for 6 months before it is deleted.
[] If the user creates an account then the sessionID will be saved to the account and the users data will last indefinitely.
[] If the user does not create an account then the sessionID will be saved to the browser and the users data will last for 6 months.


** Bug Fixes:
[] lag in data display.
[] Handle errors.
[] Debug margin issue on body. inline style added as temp fix.
[] If No data is passed to the FavoritesItem component. How shall I handle the error?


*** IDEAS

- Play around with using Bard to generate a list of mountains user can pick for a weather forecast.
*** Resources

- https://stackoverflow.com/questions/35485453/changing-views-in-reactjs

- https://countrystatecity.in/docs/api/all-countries/
- 

*** DEBUG SERVER COMMANDS: (Run these in different terminals)
Debug Express: DEBUG=express:* node app.js
Debug Server: DEBUG=elements_weather_api:* npm start     
Debug Session: DEBUG=express-mysql-session* node app.js     

*** GEONAMES API

Discovered a new open source api which I can access an incredible amount of data about cities and populated places all over the world via REST API.  

Question I have now is, do I stream that data into a mysql database?
Or just consome it as needed.  
Latter for now seems appropiate.

** Resources:
- https://hevodata.com/learn/rest-api-to-mysql-2-easy-methods/
- https://github.com/geopipes/geonames-stream
- https://www.geonames.org/export/geonames-search.html

** Weather.gov finally has a useful api.
- GitHub acct: https://weather-gov.github.io/api/gridpoints
- Endpoints: https://www.weather.gov/documentation/services-web-api
- https://api.weather.gov/points/{lat},{lon}
- https://www.noaa.gov/tools-and-resources/weather-and-climate-resources#historic

** Weather Data:
- Snowpack: https://www.nrcs.usda.gov/resources/data-and-reports/snow-and-climate-monitoring-predefined-reports-and-maps
- NOAA HISTORICAL WEATHER API: https://www.ncdc.noaa.gov/cdo-web/webservices/v2


SQL

CREATE TABLE locations (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  latitude DECIMAL(10,7) NOT NULL,
  longitude DECIMAL(10,7) NOT NULL
);


SESSION:
Here is what I understand.  Session storage will remember the url until the tab is closed.
So, when the user navigate to the url I need to save the sessionID to the session storage.
Then that sessionID will be available to check against the session_id in the db.