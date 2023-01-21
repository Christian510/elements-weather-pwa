import React from 'react';
import { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router-dom';
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
import './styles/index.css';
import './styles/root.css';
import './styles/skeleton.css';
import Header from './views/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import NavDropdown from './components/NavDropdown/NavDropDown';
import AboutAppView from './views/AboutAppView/AboutAppView';
import ErrorPage from './views/ErrorPage/ErrorPage';
import CreateAccountView from './views/CreateAccountView/CreateAccountView';
import LoginView  from './views/LoginView/LoginView';
import AccountView from './views/AccountView/AccountView';
import FavoritesView from './views/Favorites/Favorites';
import CurrentWeatherView from './views/CurrentWeatherView/CurrentWeatherView';
import { getWeatherByCity } from './models/weather_data';


let router = createBrowserRouter(
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
              loader={weatherLoader}
              // action={}
              />
        <Route path='/favorites' element={<FavoritesView />} />
        <Route path='/create_account' element={<CreateAccountView />} />
        <Route path='/login' element={<LoginView />} />
        <Route path='/user_account' element={<AccountView />} />

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

export async function weatherLoader() {
  const city = await getWeatherByCity();
  return { city };
}

export function Home() {

  let navigation = useNavigation();
  let revalidator = useRevalidator();
  let fetchers = useFetchers();
  let fetcherInProgress = fetchers.some((f) =>
    ['loading', 'submitting'].includes(f.state)
  );

  return (
    <>
    {/* all the other elements */}
    <div className="App-container">
      <Header>
        <SearchBar />
        <NavDropdown user="Glen" />
      </Header>
      <h2>Welcome to Elements Weather</h2>

      <div style={{ position: 'fixed', top: 40, right: 20 }}>
        {navigation.state !== 'idle' && <p>Navigation in progress...</p>}
        {revalidator.state !== 'idle' && <p>Revalidation in progress...</p>}
        {fetcherInProgress && <p>Fetcher in progress...</p>}
      </div>
      <Outlet />
    </div>
    </>
  );
}

