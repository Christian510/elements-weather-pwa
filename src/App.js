import React from 'react';
import {
  Outlet,
  useFetchers,
  useNavigation,
  useRevalidator,
  useLoaderData,
} from 'react-router-dom';
import { Container } from '@mui/material';
// import './App.css';
import './index.css';
import SearchInput from './components/MuiSearchBar/SearchWeatherByLocation';
import RtDrawer from './components/Menu/Menu';
import Header from './components/NavBar/Header';

export function Home() {
  let navigation = useNavigation();
  let revalidator = useRevalidator();
  let fetchers = useFetchers();
  let fetcherInProgress = fetchers.some((f) =>
    ['loading', 'submitting'].includes(f.state)
  );
  const favorites = useLoaderData();

  return (
    <>
      <Header >
        <SearchInput />
        <RtDrawer />
      </Header>
      <Container id="outlet" sx={
        {
          padding: (theme) => theme.spacing(0),
          margin: (theme) => theme.spacing(.25, 'auto'),
        }
      }>
        <Outlet />
      </Container>

      <div style={{ position: 'fixed', top: 40, right: 20 }}>
        {navigation.state !== 'idle' && <p>Navigation in progress...</p>}
        {revalidator.state !== 'idle' && <p>Revalidation in progress...</p>}
        {fetcherInProgress && <p>Fetcher in progress...</p>}
      </div>
    </>
  );
}

