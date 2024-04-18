import React, {useState, useEffect} from 'react';
import { Outlet, useFetchers, useNavigation, useRevalidator } from 'react-router-dom';
import { Container } from '@mui/material';
// import './App.css';
import './index.css';
import SearchInput from './components/MuiSearchBar/SearchWeatherByLocation';
import Menu from './components/Menu/Menu';
import Header from './components/NavBar/Header';
import ElmTheme from './ElmThemeStyles/ElmTheme';
import Favorites from './views/Favorites/Favorites';
import { fetchFavorites, getForecastByLatLon, queryForecastData } from './models/weather_api';



export function Home({theme}) {
  let navigation = useNavigation();
  let revalidator = useRevalidator();
  let fetchers = useFetchers();
  let fetcherInProgress = fetchers.some((f) =>
    ['loading', 'submitting'].includes(f.state)
  );

  const [ data, setData ] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [forecasts, setForecasts] = useState([]);
  
  
  useEffect(() => {
      async function fetchFavoritesData() {
        try {
          let data = await fetchFavorites();
          console.log('data: ', data);
          // setFavorites(data.locations);
          setSessionId(data.session);

          let locations = data.locations.map(async (location) => {
            console.log('location: ', location);
            location.api = await getForecastByLatLon(location.lat, location.lng);
            return location;
          });
          // data = await Promise.all(data);
          console.log('data updated: ', await Promise.all(locations));

          data = data.api.map(async (api) => {
            console.log('api: ', api);
            data.forecast = await queryForecastData(api.properties.forecast);
          });
          // console.log('forecasts: ', await Promise.all(f));
          setForecasts(await Promise.all(data));

        }
        catch (err) {
          console.log('error: ', err);
        }
      }
      fetchFavoritesData();

  // Refactor custom hooks to fetch all data for urls and locations.
  // set state for sessionId. Maybe a fetch session id function.
    // Refactor custom hooks to fetcha all data for url and locations.

  //   return () => {
  //     console.log('Home useEffect cleanup');
  //   };
  }, []);

    console.log('favorites: ', favorites);
    console.log('forecasts: ', forecasts);
  return (
    <Container sx={{
      backgroundColor: ElmTheme.palette.background.default,
    }}>
        <Header theme={ElmTheme} >
          <Menu />
          <SearchInput />
        </Header>
        {/* <Favorites forecasts={forecasts} /> */}
        <div id="outlet" >
          <Outlet />
        </div>

        <div style={{ position: 'fixed', top: 40, right: 20 }}>
          {navigation.state !== 'idle' && <p>Navigation in progress...</p>}
          {revalidator.state !== 'idle' && <p>Revalidation in progress...</p>}
          {fetcherInProgress && <p>Fetcher in progress...</p>}
        </div>
      </Container>
  );
}

