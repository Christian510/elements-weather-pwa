*** ELEMENTS WEATHER PWA
** This is a personal project.  It was originally written With plane HTML,CSS, and Express/EJS. But, I didn't like the performance so, I rewrote it in React.js and Material UI.

Some Takeaways from working on this project.  

1. I Like some elements of Material UI.  I does auto populate really well.  And, building it myself may have taken a lot more time.  But, it is hard to tell since I spent a lot of time learning to use Material UI.  And, I may never use it in a commercial environment.  I do like the way it handles styling.  If I were to use it again in the future for another project I would be more sparing in using the components and just use the styling framework.

2. I used mysql on this project instead of mongoDB.  Maily because I was getting really rusty with my sql.  I really liked how easy it is to work with Mongo cloud platform.  I found it much easier to set up and work with their dbs.  Plus it just works well with Node.js. Mysql took some time to get a local environment up and running.  I had to download the WorkBench and various tools several times and debug it before I would do anything with it.  But, once it was running, I found the workbench easy to work with and test my schemas.

3. I learned the value of AI on this project.  When I ran into complex problems, I learned how to write more and more saphisticated promts. I learned that AI is not a crutch.  If you don't understand your problem you won't fully understand the code AI generates.  This can cause more problems than it solves. For example you can have AI generate React code and it may implement some hooks like useEffect.  But, if you do not understand how and when to use the useEffect hook and the gotcha's, then that code AI generated my cause downstream problems since AI is not privi to your entire code base.


If you have any interest in working on this with me let me know.

*** TODOS
[]  Add weather alerts on current current conditions.
[]  Add geoLocation: Provide user option to display weather for current lat and lng. If yes, save to db.
[]  Use geoLocation to display location on a map.
[]  Build out user login page and wire it up to a db user table.
[]  Favorite component swipe to delete ui.
[X] Add sessions to server.
[X] Create local test db for saved forecast locations.
[X] Create Sessions db.
[] DB for historical forecast data.
[] Secure Login form
[] Figure out how to test app on phone.
[X] Rename ForecastView to CurrentConditionsView
[] Convert to production:
    [] host.
    [] remote db
    [] PWA process
[] Before production remove all dev console logs
[X] NEED TO WORK ON A WAY TO FILTER OPTIONS LIST AS THE USER TYPES TO CONTINUE NARROWING THE OPTIONS
[X] Save the city forecast data with the sessionID.
[X] Users session will last for 6 months before it is deleted.
[] If the user creates an account migrate session_favorites to user_favorites last indefinitely.

** Bug Fixes:
[X] lag in data display.
[] Handle errors.
[] Debug margin issue on body. inline style added as temp fix.
[X] If No data is passed to the FavoritesItem component. How shall I handle the error?
[] Favorites view does not scroll to end of list.

*** IDEAS
- Play around with using Bard to generate a list of mountains user can pick for a weather forecast.
*** Resources

- https://stackoverflow.com/questions/35485453/changing-views-in-reactjs

- https://countrystatecity.in/docs/api/all-countries/
- 

*** DEBUG SERVER COMMANDS: (Run these in different terminals)
Debug Express: DEBUG=express:* node ./bin/www    
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
- Weather Icons: https://react-icons.github.io/react-icons/icons/wi/

** Weather.gov finally has a useful api.
- Forecast Endpoints: https://www.weather.gov/documentation/services-web-api#/default/gridpoint_forecast
- API Overview: https://www.weather.gov/documentation/services-web-api
- FAQ Page: https://weather-gov.github.io/api/gridpoints
- https://api.weather.gov/points/{lat},{lon}
- https://www.noaa.gov/tools-and-resources/weather-and-climate-resources#historic
- Area Alerts:
https://api.weather.gov/alerts/active?area={state}
For example: https://api.weather.gov/alerts/active?area=KS

** Weather Data:
- Snowpack: https://www.nrcs.usda.gov/resources/data-and-reports/snow-and-climate-monitoring-predefined-reports-and-maps
- NOAA HISTORICAL WEATHER API: https://www.ncdc.noaa.gov/cdo-web/webservices/v2