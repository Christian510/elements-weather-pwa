import { useState, useEffect } from 'react';
import { Outlet, useFetchers, useNavigation, useRevalidator } from 'react-router-dom';
import { Container } from '@mui/material';
// import './App.css';
import './index.css';
import SearchInput from './components/MuiSearchBar/SearchWeatherByLocation';
import Menu from './components/Menu/Menu';
import Header from './components/NavBar/Header';
import {ElmTheme} from './ElmThemeStyles/ElmTheme';
import { fetchFavorites, fetchAllData } from './models/weather_api';

export async function loader() {
  try {
    const data =  await fetchFavorites();
    const fetchForecasts = data.locations.map(async (l) => await fetchAllData(l));
    const forecasts = await Promise.all(fetchForecasts);
    return { forecasts: forecasts, sessionId: data.session };
  }
  catch (error) {
    console.error('Error fetching favorites: ', error);
  }
}

export function Home() {
  let navigation = useNavigation();
  let revalidator = useRevalidator();
  let fetchers = useFetchers();
  let fetcherInProgress = fetchers.some((f) =>
    ['loading', 'submitting'].includes(f.state)
  );

  return (
    <Container sx={{
      backgroundColor: ElmTheme.palette.background.default,
    }}>
      <Header theme={ElmTheme} >
        <Menu />
        <SearchInput />
      </Header>
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

