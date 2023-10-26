import React, { useMemo, useEffect, useState } from 'react';
import {
  useParams,
} from 'react-router-dom';
import '../../styles/index.css';
import '../../styles/root.css';
import '../../styles/skeleton.css';
import date from '../../models/date';
import { WeatherDate } from '../../models/date';
import { getForecastByLatLon } from '../../models/weather_api';
import { debounce } from '@mui/material/utils';
import { useFetch } from '../../custom_hooks/useFetch';


export default function WeatherForecast() {
  
  const [url, setUrl] = useState('')
  // console.log('url', url);
  
  
  let { city } = useParams();
  const c = JSON.parse(city);
  console.log('params: ', c);
  
  // if (c !== undefined) setLocation(c);
  
  
  const fetchForecastUrl = async (loc) => {
    // console.log('loc: ', loc);
    const response = await getForecastByLatLon(loc.coords.lat, loc.coords.lng);
    console.log('response: ', response.properties.forecast)
    setUrl(response.properties.forecast);
  }
  
  useEffect(() => {
    if ( c !== undefined) {
      console.log('feutch url')
      fetchForecastUrl(c);
    }
  }, [c]);
  
  const { data, loading} = useFetch(url)
  // console.log('wd: ', data)
  const current = data?.properties.periods[0]
  return (
    <>
      <div className='heading'>
        <h1>Weather Forecast</h1>
        <p>for {c.name}</p>
        <div className="today">{current?.detailedForecast}</div>
      </div>
    </>
  );
}
