import React, { useState, useMemo } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import {
  useParams,
} from 'react-router-dom';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { DateTime } from '../../models/date';
import ElmSpinner from '../../components/ElmSpinner/ElmSpinner';
import { margin, padding } from '@mui/system';
import { getForecastByLatLon, queryForecastData } from '../../models/weather_api';
import Axios from 'axios';
// Save forecast to database button needed.
// I'll have to scrap the custom hooks and add the fetch to the server and then get the data from the server.

export default function CurrentConditions() {
  let { city } = useParams();
  console.log('city: ', city);
  const c = JSON.parse(city);
  // console.log('params: ', c);

  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  useMemo(() => {
    console.log('useMemo fired')

    // Axios.get('/favorite/all')

    getForecastByLatLon(c.coords.lat, c.coords.lng)
      .then(resp => {
        console.log('resp: ', resp);
        if (resp === null) {
          setLoading(false)
        }
        if (resp) {
          // Here I want to save the locations name, lat, lon, and the forecast url to the db.
          c.url = resp.properties.forecast;
          console.log('c: ', c);
          // Axios.post('/favorite', c)
          return queryForecastData(resp.properties.forecast)
        }
      })
      .then(data => {
        if (data) {
          setForecast(data.properties)
          setLoading(false)
        }
      })

  }, [city]);
  
  const dateTime = DateTime.convertISO8601Format(forecast?.generatedAt);
  const temp = forecast?.periods[0].temperature;
  const icon = forecast?.periods[0].icon;
  const tempUnit = forecast?.periods[0].temperatureUnit;
  const detailedForecast = forecast?.periods[0].detailedForecast;
  const date = `Last updated: ${dateTime.dow}, ${dateTime.date}`

  return (
    <>
      {loading ? (
        <ElmSpinner size='lg' />
      ) : (
        <>
          <Card
            id='forecast-view-heading'
            sx={{
              padding: (theme) => theme.spacing(1),
              margin: (theme) => theme.spacing(.5)
            }}>
            <p>{c.name}</p>
            <p className="date-time">{date}</p>
            <p className="temperature">{temp} {tempUnit}</p>
            <img className="icon" src={icon} />
            <div className="today">{detailedForecast}</div>
          </Card>
          <Container
            sx={{
              padding: 0,
            }}
          >
            <Typography
              className="carousel"
              variant='h6'
              sx={
                {
                  margin: (theme) => theme.spacing(1, 0, 1, 0),
                  textAlign: 'center',
                }
              }>Forecast</Typography>
            {forecast && <Carousel id='Carousel' forecast={forecast} loading={loading} />}
          </Container>
        </>
      )}
    </>
  )
}