import React, { useState, useEffect } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ElmImg from '../../components/ElmImage/ElmImage';
import Styled from '@mui/system/styled';
import { DateTime } from '../../models/date';
import ElmSpinner from '../../components/ElmSpinner/ElmSpinner';
import ElmList from '../../components/ElmList/ElmList';
import { getForecastUrl, queryForecastData } from '../../models/weather_api';
import Axios from 'axios';
import ElmTheme from '../../ElmThemeStyles/ElmTheme';

export default function CurrentConditions() { // fetch the forecast data and display it.
  // const sessionId = document.cookie.split('=')[1];
  let { location } = useParams();

  const params = JSON.parse(location);
  console.log('params: ', params);

  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log('forecast: ', forecast);

  useEffect(() => {
    console.log('useEffect fired')
    let isMounted = true;

    getForecastUrl(params.lat, params.lng)
      .then(resp => {
        console.log('isMounted: ', isMounted)
        if (!isMounted) return; 
        if (resp === null) {
          setLoading(false)
        }
        if (resp) {
          console.log('resp: ', resp);
          // params.url = resp.properties.forecast;
            Axios.post('/favorites/add-one', params)
              .then((response) => {
                console.log('add one resp: ', response);
              }).catch((error) => {
                console.log('error: ', error);
              });
          return queryForecastData(resp.properties.forecast)
        }
      })
      .then(data => {
        if (!isMounted) return;
        if (data) {
          setForecast(data.properties)
          setLoading(false)
        }
      })

      return () => {
        // Cleanup function
        isMounted = false; // Update flag to indicate component is unmounted
      };

  }, [location]);

  // console.log('forecast: ', forecast);
  const dateTime = DateTime.convertISO8601Format(forecast?.generatedAt);
  const temp = forecast?.periods[0].temperature;
  const icon = forecast?.periods[0].icon;
  const tempUnit = forecast?.periods[0].temperatureUnit;
  const detailedForecast = forecast?.periods[0].detailedForecast;
  const shortForecast = forecast?.periods[0].shortForecast;
  const date = `Last updated: ${dateTime.dow}, ${dateTime.date}`
  // console.log('forecast: ', forecast)

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
          <Card>
            <ElmList
              key={extendedForecast.id}
              type="Detailed-Forecast"
              items={extendedForecast}
              renderItem={(forecast) =>
                <ListItem
                  key={forecast.number}
                  divider={true}
                >
                  <ElmImg src={forecast.icon} alt={forecast.shortForecast} width='80px' height='80px' />
                  <Typography variant='body1'>{forecast.detailedForecast}</Typography>
                </ListItem>
              }
            />
          </Card>
        </>
      )}
    </>
  )
}

const Content = Styled(Typography)`
  padding-top: ${ElmTheme.spacing(2)}px;
  padding-bottom: ${ElmTheme.spacing(2)}px;
`;
const ElmCard = Styled(Card)`
  padding: ${ElmTheme.spacing(1)}px;
  margin: ${ElmTheme.spacing(.5)}px;
`;