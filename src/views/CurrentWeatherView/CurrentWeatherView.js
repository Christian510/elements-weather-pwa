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



function Weather(props) {
    let w = useLoaderData();
    console.log("Weather comp: ", w);
    if(!w) {
        console.log("You need to provide a city and state.")
    }
    else {
        console.log('weather obj: ', w)
        // let offset = w.timezone_offset;
        let timezone = w.timezone;
        // let getDate = WeatherDate.convertUTC(w.dt, w.sunrise, w.sunset, offset, timezone);
        // console.log(getDate);
        // console.log("city: ", w.name)
        // console.log('offset', offset)
        console.log('timezone', timezone)
    }
        return (
            <>
            <div className='heading'>                
                <div>{w.name}, ID</div>
                <div>32deg F</div>
            </div>
            </>
        );
}

export default Weather;