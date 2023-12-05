import React, { useState } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import {
  useParams,
} from 'react-router-dom';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { DateTime } from '../../models/date';
import { useFetchData } from '../../custom_hooks/useFetch';
import { useFetchUrl } from '../../custom_hooks/useFetchUrl';
import ElmSpinner from '../../components/ElmSpinner/ElmSpinner';

// create a spinner to wait for the data to update?
// Save forecast to database button needed.


export default function CurrentConditions() {

  let { city } = useParams();
  const c = JSON.parse(city);
  // console.log('params: ', c);
  const { url, fetching } = useFetchUrl(c);
  const { data, loading } = useFetchData(url)
  
  const renderPage = () => {
    if (loading === true ) {
      return (
      
      <ElmSpinner size='lg' />
      
      );
    } else {
      // console.log('loading: ', loading);
      // console.log('data: ', data);
      let forecast = data.properties;
      
      const dateTime = DateTime.convertISO8601Format(forecast.generatedAt);
      const temp = forecast.periods[0].temperature;
      const icon = forecast.periods[0].icon;
      const tempUnit = forecast.periods[0].temperatureUnit;
      const detailedForecast = forecast.periods[0].detailedForecast;
      const date = `Last updated: ${dateTime.dow}, ${dateTime.date}`
      return (
          <>
              <Card className='heading' >
              <p>{c.name}</p>
              <p className="date-time">{date}</p>
              <p className="temperature">{temp} {tempUnit}</p>
              <img className="icon" src={icon} />
              <div className="today">{detailedForecast}</div>

            </Card>
            <div className="carousel">Forecast</div>
            <Carousel properties={forecast} loading={loading} />
          </>
      )
      
      
    }
  }

  return (
    <>
      <Container id='forecast-view' maxWidth='xs'>
        {renderPage()}
      </Container>
    </>
  );
}