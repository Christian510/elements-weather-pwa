import React from 'react';
import { Outlet, useFetchers, useNavigation, useRevalidator } from 'react-router-dom';
import { Container } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
// import './App.css';
import './index.css';
import SearchInput from './components/MuiSearchBar/SearchWeatherByLocation';
import Menu from './components/Menu/Menu';
import Header from './components/NavBar/Header';
import { fetchFavorites, fetchAllData } from './models/weather_api';

export async function loader() {
  try {
    const data =  await fetchFavorites();
    console.log("data: ", data); // ***** DEBUG ***** //
    const fetchForecasts = data.locations.map(async (l) => await fetchAllData(l));
    const forecasts = await Promise.all(fetchForecasts);
    // console.log("forecasts: ", forecasts[0]);
    return { forecasts: forecasts, sessionId: data.session };
  }
  catch (error) {
    console.error('Error fetching favorites: ', error);
  }
}

export function Home() {
  const theme = useTheme();
  let navigation = useNavigation();
  let revalidator = useRevalidator();
  let fetchers = useFetchers();
  let fetcherInProgress = fetchers.some((f) =>
    ['loading', 'submitting'].includes(f.state)
  );

  return (
    <Container
    id="app-container"
    sx={{
      backgroundColor: theme.palette.background.default,
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100vh',
      margin: 'auto',
    }}>
      <Header >
        <Menu />
        <SearchInput />
      </Header>
      <StyledOutlet id="outlet" >
        <Outlet />
      </StyledOutlet>
      <div style={{ position: 'fixed', top: 40, right: 20 }}>
        {navigation.state !== 'idle' && <p>Navigation in progress...</p>}
        {revalidator.state !== 'idle' && <p>Revalidation in progress...</p>}
        {fetcherInProgress && <p>Fetcher in progress...</p>}
      </div>
    </Container>
  );
}

const StyledOutlet = styled('div')(({ theme }) => ({
  height: '100%',
  padding: '0 0 6em 0',
}));

