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
} from 'react-router-dom';
import '../../styles/index.css';
import '../../styles/root.css';
import '../../styles/skeleton.css';

function Weather(props) {
    let data = useLoaderData();
    console.log(data);
        return (
            <>
                <div>Current Weather for Boise, ID</div>
            </>
        );
}

export default Weather;