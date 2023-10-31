import React from 'react';
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
import ReactDOM from "react-dom/client";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { Home } from './App';
import ErrorPage from './views/ErrorPage/ErrorPage';
import WeatherForecastView from './views/WeatherForecastView/WeatherForecastView';
import Favorites from './views/Favorites/Favorites';

let router = createBrowserRouter([ // Make this a component and pass in props
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/weather-forecast/:city',
        element: <WeatherForecastView />,
      }
    ],
  },
  {
    path: '/favorites',
    element: <Favorites />,
  }
]);
{/* <Route path='/about' element={<AboutAppView />} />
  <Route
    path='/weather-forecast'
  <Route path='/favorites' element={<FavoritesView />} />
  <Route path='/create_account' element={<CreateAccountView />} />
  <Route path='/login' element={<LoginView />} />
  <Route path='/user_account' element={<AccountView />} />
  <Route path='/demo_view' element={<DemoView />} /> */}

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

// export default function App() {
//   return <RouterProvider router={router} fallbackElement={<Fallback />} />;
// }

export function sleep(n = 500) {
  return new Promise((r) => setTimeout(r, n));
}

export function Fallback() {

  // TODO: Style this up and maybe add a spinner
  return <p>Performing initial data load</p>;
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<Fallback />} />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
