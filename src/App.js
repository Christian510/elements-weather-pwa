import React from 'react';
import {
  Outlet,
  useFetchers,
  useNavigation,
  useRevalidator,
} from 'react-router-dom';
import { Container } from '@mui/material';
import './App.css';
import './index.css';
import SearchInput from './components/MuiSearchBar/SearchWeatherByLocation';
import Menu from './components/Menu/Menu';
import Header from './components/NavBar/Header';

export function Home() {
  let navigation = useNavigation();
  let revalidator = useRevalidator();
  let fetchers = useFetchers();
  let fetcherInProgress = fetchers.some((f) =>
    ['loading', 'submitting'].includes(f.state)
  );
  const sessionID = document.cookie.split('=')[1];
  console.log('sessionID: ', sessionID);
  return (
    <>
    <Container>
      <Header >
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
    </>
  );
}

const grey = {
  50: '#f7f7f7',
  100: '#eeeeee',
  200: '#e1e1e1',
  300: '#cfcfcf',
  400: '#aaaaaa',
  500: '#898989',
  600: '#626262',
  700: '#4f4f4f',
  800: '#313131',
  900: '#111111',
};

