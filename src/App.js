import React from 'react';
import { useState, useMemo } from 'react';
import { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router-dom';
import { debounce } from '@mui/material/utils';
import {
  Await,
  createBrowserRouter,
  createRoutesFromElements,
  defer,
  Form,
  Link,
  Outlet,
  Route,
  RouterProvider,
  useAsyncError,
  useAsyncValue,
  useFetcher,
  useFetchers,
  useLoaderData,
  useNavigation,
  useParams,
  useRevalidator,
  useRouteError,
} from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import '../src/styles/index.css';
import '../src/styles/root.css';
import SearchInput from './components/MuiSearchBar/SearchWeatherByLocation';
import RtDrawer from './components/Menu/Menu';
import AboutAppView from './views/AboutAppView/AboutAppView';
import ErrorPage from './views/ErrorPage/ErrorPage';
import CreateAccountView from './views/CreateAccountView/CreateAccountView';
import LoginView from './views/LoginView/LoginView';
import AccountView from './views/AccountView/AccountView';
import FavoritesView from './views/Favorites/Favorites';
import CurrentWeatherView from './views/WeatherForecastView/WeatherForecastView';
import DemoView from './views/DemoView/DemoView';

import Header from './components/NavBar/Header';
import { queryLocations } from './models/city_api'
import { getForecastByLatLon } from './models/weather_api';

let router = createBrowserRouter( // Make this a component and pass in props
  createRoutesFromElements(
    <Route
      path='/'
      element={<Home />}
      // action={Home.action}
      errorElement={<ErrorPage />}
    >
      <Route path='/about' element={<AboutAppView />} />
      <Route
        path='/weather'
        element={<CurrentWeatherView />}
      // loader={async ({ request }) => {
      //   let url = new URL(request.url);
      //   let city = url.searchParams.get("citySearch");
      //   console.log("city url: ", city);
      //   return getForecastByCity(city);
      // }} 
      />
      <Route path='/favorites' element={<FavoritesView />} />
      <Route path='/create_account' element={<CreateAccountView />} />
      <Route path='/login' element={<LoginView />} />
      <Route path='/user_account' element={<AccountView />} />
      <Route path='/demo_view' element={<DemoView />} />

    </Route>
  )
);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

export default function App() {
  return <RouterProvider router={router} fallbackElement={<Fallback />} />;
}

export function sleep(n = 500) {
  return new Promise((r) => setTimeout(r, n));
}

export function Fallback() {

  // TODO: Style this up and maybe add a spinner
  return <p>Performing initial data load</p>;
}

export function Home() {
  let navigation = useNavigation();
  let revalidator = useRevalidator();
  let fetchers = useFetchers();
  let fetcherInProgress = fetchers.some((f) =>
    ['loading', 'submitting'].includes(f.state)
  );

  // console.log('navigation: ', navigation);
  // console.log('revalidator: ', revalidator);
  // console.log('fetchers: ', fetchers);
  // console.log('fetcherInProggress: ', fetcherInProgress);

  const [forecast, setForecast] = useState(null);
  console.log('Home()forecast: ', forecast);

  // const fetchWeather = useMemo(() => {

  // }, [forecast]);

  const getForecast = async (city) => {
    console.log('city: ', city);
    if (city === null || city === undefined) {
      return;
    } else {
    let f = await getForecastByLatLon(city.coords.lat, city.coords.lng);
    console.log('f: ', f);
    // setForecast(f);
    // console.log('forecast: ', forecast);
    }
  }

  return (
    <>
      <Header >
        <SearchInput
          functions={{ 'getForecast': getForecast }}
        />
        <RtDrawer />
      </Header>

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
      <Outlet />
    </>
  );
}

