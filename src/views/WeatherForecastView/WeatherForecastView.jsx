import React from 'react';
import { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router-dom';
import {
//   Await,
//   createRoutesFromElements,
//   defer,
//   Form,
//   Link,
//   RouterProvider,
//   useAsyncError,
//   useAsyncValue,
//   useFetcher,
//   useFetchers,
  useLoaderData,
//   useNavigation,
//   useParams,
//   useRevalidator,
//   useRouteError,
//   useActionData,
} from 'react-router-dom';
import '../../styles/index.css';
import '../../styles/root.css';
import '../../styles/skeleton.css';
import date from '../../models/date';
import { WeatherDate } from '../../models/date';



export default function WeatherForecast(props) {

        return (
            <>
            <div className='heading'>                
                <h1>Weather Forecast</h1>
            </div>
            </>
        );
}