import React from 'react';
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
// import './App.css';
import './index.css';
// import '../src/styles/root.css';
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
  
  return (
    <>
      <Header >
        <SearchInput />
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
    </>
  );
}

