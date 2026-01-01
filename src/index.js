import { StrictMode } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import ReactDOM from "react-dom/client";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { Home } from './App';
import ErrorPage from './views/ErrorPage/ErrorPage';
import CurrentConditionsView from './views/CurrentConditionsView/CurrentConditionsView';
import Favorites from './views/Favorites/Favorites';
import AboutAppView from './views/AboutAppView/AboutAppView';
import ExtendedForecastView from './views/ExtendedForecastView/ExtendedForecastView';
import LoginView from './views/LoginView/LoginView';
import CreateAccountView from './views/CreateAccountView/CreateAccountView';
import AccountView from './views/AccountView/AccountView';
import Settings from './views/Settings';
import { ElmTheme } from './ElmThemeStyles/ElmTheme';
import { ThemeProvider } from '@mui/material/styles';
import ElmSpinner from './components/ElmSpinner/ElmSpinner';
import ForgotPassword from './components/ForgotPassword';
import ForgotUsername from './components/ForgotUsername';
import { loader as rootLoader } from './models/loader';
import './index.css';

let router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    id: "root",
    errorElement: <ErrorPage title="Home View" />,
    loader: rootLoader,
    children: [
      {
        element: <Favorites />,
        id: "favorites",
        index: true,
        errorElement: <ErrorPage title="Favorites View" />,
        loader: rootLoader,
      },
      {
        element: <CurrentConditionsView />,
        id: "current_conditions",
        path: 'forecast/:location',
        errorElement: <ErrorPage title="Current Conditions View" />,
        loader: rootLoader,
      },
      {
        element: <ExtendedForecastView />,
        path: 'forecast/:location/extended',
        errorElement: <ErrorPage />,
      }
    ],
  },
  {
    element: <LoginView />,
    path: 'login',
    errorElement: <ErrorPage />,
  },
  {
    element: <ForgotPassword />,
    path: 'forgot_password',
    ErrorPage: <ErrorPage />
  },
  {
    element: <ForgotUsername />,
    path: 'forgot_username',
    ErrorPage: <ErrorPage />
  },
  {
    element: <CreateAccountView />,
    path: 'create_account',
    errorElement: <ErrorPage />,
  },
  {
    element: <AccountView />,
    path: 'user_account',
    errorElement: <ErrorPage />,
  },
  {
    element:<AboutAppView /> ,
    path: 'about',
    errorElement: <ErrorPage />,
  },
  {
    element: <Settings />,
    path: 'settings',
    errorElement: <ErrorPage />,
  }
]);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

export function sleep(n = 100) {
  return new Promise((r) => setTimeout(r, n));
}

export function Fallback() {
  // TODO: Style this up and maybe add a spinner
  return (
    <ElmSpinner />
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <ThemeProvider theme={ElmTheme}>
      <RouterProvider router={router} fallbackElement={<Fallback />} />
    </ThemeProvider>
  </StrictMode>
);

const preloader = document.getElementById('preloader');
if (preloader) {
  preloader.remove();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Check if the app is running in standalone mode
// Comment this out once the app is in production
const isInStandaloneMode = () =>
  ('standalone' in window.navigator) && (window.navigator.standalone);

console.log('Is PWA standalone:', isInStandaloneMode());
