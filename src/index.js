import React from 'react';
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import App from './App';
// import './styles/index.css';
import AboutAppView from './views/AboutAppView/AboutAppView';
import ErrorPage from './views/ErrorPage/ErrorPage';
import CreateAccountView from './views/CreateAccountView/CreateAccountView';
import LandingPageView from './views/LandingPageView/LandingPageView';
// import LoginView  from './views/LoginView/LoginView';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/landingPageView",
        element: <LandingPageView />
      },
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
        element: <div>Saved Locations and search feature</div>
      },
      {
        path: "/login",
        element: <div>Login View</div>
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
