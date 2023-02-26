import React from 'react';
import { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router-dom';
import {
  Await,
  createRoutesFromElements,
  defer,
  Form,
  Link,
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
  useActionData,
} from 'react-router-dom';
import '../../styles/index.css';
import '../../styles/root.css';
import '../../styles/skeleton.css';



function Weather(props) {
    let weather = useLoaderData();
    console.log("Weather comp: ", weather);
    if(!weather) {
        console.log("You need to provide a city and state.")
    }
    else {
        console.log("city: ", weather.name)
        // console.log("weather: ", weather.main)'
    }
        return (
            <>
                <div>Current Weather for {weather.name}, ID:{weather.weather[0].descreption}</div>
            </>
        );
}

export default Weather;