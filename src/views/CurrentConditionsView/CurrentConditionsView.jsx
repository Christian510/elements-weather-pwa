import React, { useState, useMemo } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import {
  useParams,
} from 'react-router-dom';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/system';
import { DateTime } from '../../models/date';
import ElmSpinner from '../../components/ElmSpinner/ElmSpinner';
import ElmList from '../../components/ElmList/ElmList';
import { margin, padding } from '@mui/system';
import { getForecastByLatLon, queryForecastData } from '../../models/weather_api';
import Axios from 'axios';
import { List } from '@mui/material';
// Save forecast to database button needed.
// I'll have to scrap the custom hooks and add the fetch to the server and then get the data from the server.

export default function CurrentConditions() {
  const sessionId = document.cookie.split('=')[1];
  // console.log('session_id: ', sessionId);
  let { location } = useParams();

  const params = JSON.parse(location);
  // console.log('params: ', params);

  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  useMemo(() => {
    console.log('useMemo fired')

    // Axios.get('/forecast', { params: { id: c.id } })')

    getForecastByLatLon(params.lat, params.lon)
      .then(resp => {
        // console.log('resp: ', resp);
        if (resp === null) {
          setLoading(false)
        }
        if (resp) {
          // Here I want to save the locations name, lat, lon, and the forecast url to the db.
          params.url = resp.properties.forecast;
          // console.log('params: ', params);
          // Axios.post('favorite/forecast/', c)
          return queryForecastData(resp.properties.forecast)
        }
      })
      .then(data => {
        if (data) {
          setForecast(data.properties)
          setLoading(false)
        }
      })

  }, [location]);


  console.log('forecast: ', forecast);
  const dateTime = DateTime.convertISO8601Format(forecast?.generatedAt);
  const temp = forecast?.periods[0].temperature;
  const icon = forecast?.periods[0].icon;
  const tempUnit = forecast?.periods[0].temperatureUnit;
  const detailedForecast = forecast?.periods[0].detailedForecast;
  const shortForecast = forecast?.periods[0].shortForecast;
  const date = `Last updated: ${dateTime.dow}, ${dateTime.date}`
  // console.log('forecast: ', forecast)
  // Add detailed extended forecast.

  const extendedForecast = forecast?.periods

  // .map((elm, i) => {
  //   if (i > 0) {
  //     return (
  //       <Container key={i}>
  //         <Typography variant='h6'>{elm.name}</Typography>
  //         <Typography variant='body1'>{elm.detailedForecast}</Typography>
  //       </Container>
  //     );
  //   }
  // });

  return (
    <>
      {loading ? (
        <ElmSpinner size='lg' />
      ) : (
        <>
          <Card
            id='forecast-view-heading'
            sx={{
              // flexGrow: 1,
              padding: (theme) => theme.spacing(1),
              margin: (theme) => theme.spacing(.5)
            }}>
            <Grid id="forecast" container spacing={2}>
              <Grid container spacing={2}>
                <Grid container spacing={.5} xs={12}>
                  <Grid xs={12}>
                    <Content variant='h5'>Forecast for {params.name}</Content>
                  </Grid>
                  <Grid xs={12}>
                    <Content variant='subtitle2'>{date}</Content>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid xs={4}>
                    <img className="icon" src={icon} alt={shortForecast} />
                  </Grid>
                  <Grid xs={4}>
                    <Typography variant='h4'>{temp}&deg;{tempUnit}</Typography>
                  </Grid>
                  <Grid xs={4}>
                    <Typography variant='body1' >Content</Typography>
                    <Typography variant='body1' >Content</Typography>
                    <Typography variant='body1' >Content</Typography>
                    <Typography variant='body1' >Content</Typography>
                  </Grid>
                </Grid>
              </Grid>
              {/* <Grid container spacing={2}>

              </Grid> */}

            </Grid>
            {/* <Typography variant='h4'>{params.name}</Typography>
            <Typography variant='subtitle2'>{date}</Typography>
            <Typography variant='h3'>{temp}&deg;{tempUnit}</Typography>
            <img className="icon" src={icon} alt={shortForecast} /> */}
          </Card>
          <Container
            sx={{
              padding: 0,
            }}
          >
            {/* <Typography
              className="carousel"
              variant='h6'
              sx={
                {
                  margin: (theme) => theme.spacing(1, 0, 1, 0),
                  textAlign: 'center',
                }
              }>Forecast</Typography> */}
            {forecast && <Carousel id='Carousel' forecast={forecast} loading={loading} />}
          </Container>
          <ElmList
            key={extendedForecast.id}
            type="Detailed-Forecast"
            items={extendedForecast}
            renderItem={(forecast) =>
              <ListItem
                key={forecast.number}
              >
                <img className="forecast-icon" src={forecast.icon} alt={forecast.shortForecast} />
                <Typography variant='body1'>{forecast.detailedForecast}</Typography>
              </ListItem>
            }
          />
        </>
      )}
    </>
  )
}

const Content = styled(Typography)`
  padding-top: ${props => props.theme.spacing(2)}px;
  padding-bottom: ${props => props.theme.spacing(2)}px;
`;