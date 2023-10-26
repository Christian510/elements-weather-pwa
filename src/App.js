import React from 'react';
import { useState, useMemo } from 'react';
// import { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router-dom';
import { debounce } from '@mui/material/utils';
import {
  Await,
  defer,
  Form,
  Link,
  Outlet,
  useAsyncError,
  useAsyncValue,
  useFetcher,
  useFetchers,
  useLoaderData,
  useNavigation,
  useParams,
  useRevalidator,
} from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import '../src/styles/index.css';
import '../src/styles/root.css';
import SearchInput from './components/MuiSearchBar/SearchWeatherByLocation';
import RtDrawer from './components/Menu/Menu';
// import AboutAppView from './views/AboutAppView/AboutAppView';
// import ErrorPage from './views/ErrorPage/ErrorPage';
// import CreateAccountView from './views/CreateAccountView/CreateAccountView';
// import LoginView from './views/LoginView/LoginView';
// import AccountView from './views/AccountView/AccountView';
// import FavoritesView from './views/Favorites/Favorites';
// import WeatherForecastView from './views/WeatherForecastView/WeatherForecastView';
// import DemoView from './views/DemoView/DemoView';

import Header from './components/NavBar/Header';
import { getForecastByLatLon } from './models/weather_api';


export function Home() {
  let navigation = useNavigation();
  let revalidator = useRevalidator();
  let fetchers = useFetchers();
  let fetcherInProgress = fetchers.some((f) =>
    ['loading', 'submitting'].includes(f.state)
  );

  // const [forecast, setForecast] = useState(null);
  // console.log('forecast: ', forecast);



  // const getForecast = async (city) => {
  //   console.log('city: ', city);
  //   if (city === null || city === undefined) {
  //     return;
  //   } else {
  //     let f = await getForecastByLatLon(city.coords.lat, city.coords.lng);
  //     console.log('f: ', f);
  //     setForecast(f);
  
  //   }
  // }
  

  return (
    <>
      <Header >
        <SearchInput
          // functions={{ 'getForecast': getForecast }}
        />
        <RtDrawer />
      </Header>
      <div id="outlet">
        <Outlet />
      </div>

      <div style={{ position: 'fixed', top: 40, right: 20 }}>
        {navigation.state !== 'idle' && <p>Navigation in progress...</p>}
        {revalidator.state !== 'idle' && <p>Revalidation in progress...</p>}
        {fetcherInProgress && <p>Fetcher in progress...</p>}
      </div>
      {/* if (!favorites data) {
          <AboutAppView /> or <Outlet />
        } else {
          <FavoritesView />
        } */}
    </>
  );
}

