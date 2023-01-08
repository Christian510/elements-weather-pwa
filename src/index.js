import React from 'react';
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import App from './App';
import AboutAppView from './views/AboutAppView/AboutAppView';
import ErrorPage from './views/ErrorPage/ErrorPage';
import CreateAccountView from './views/CreateAccountView/CreateAccountView';
import LoginView  from './views/LoginView/LoginView';
import AccountView from './views/AccountView/AccountView';
import SavedWeatherView from './views/SavedWeatherView/SavedWeatherView';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/createAccount",
        element: <CreateAccountView name={`Create An Account`} />,
      },
      {
        path: "/about",
        element: <AboutAppView />,
      },
      {
        path: "/saved",
        element: <SavedWeatherView />,
      },
      {
        path: "/login",
        element: <LoginView />
      },
      {
        path: "/user_account",
        elements: <AccountView user='Trinity' />,
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
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
