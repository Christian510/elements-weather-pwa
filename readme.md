*** TODOS
- Add sessions to server.
- Create local db for saved forecast locations.
- Create Sessions db.
- DB for historical forecast data.
- Secure Login form
- Figure out how to test app on phone.
- Convert to production:
    - host.
    - remote db
    - PWA process


** Bug Fixes:
- lag in data display.
- Handle errors.


*** Resources

- https://stackoverflow.com/questions/35485453/changing-views-in-reactjs

- https://countrystatecity.in/docs/api/all-countries/
- 


*** GEONAMES API

Discovered a new open source api which I can access an incredible amount of data about cities and populated places all over the world via REST API.  

Question I have now is, do I stream that data into a mysql database?
Or just consome it as needed.  
Latter for now seems appropiate.

** Resources:
- https://hevodata.com/learn/rest-api-to-mysql-2-easy-methods/
- https://github.com/geopipes/geonames-stream
- https://www.geonames.org/export/geonames-search.html

Weather.gov finally has a useful api.
- https://api.weather.gov/points/{lat},{lon}

