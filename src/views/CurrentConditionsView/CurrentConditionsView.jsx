import React, { useState, useMemo } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import {
  useParams,
  useRouteLoaderData,
} from 'react-router-dom';
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
import { getForecastByLatLon, queryForecastData } from '../../models/weather_api';
import Axios from 'axios';

export default function CurrentConditions() {
  const sessionId = document.cookie.split('=')[1];
  let { location } = useParams();
  const { favorites } = useRouteLoaderData("root");
  console.log('favorites at CurrentConditionsView: ', favorites);

  const params = JSON.parse(location);
  // console.log('params: ', params);

  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  useMemo(() => {
    console.log('useMemo fired')

    getForecastByLatLon(params.coords.lat, params.coords.lng)
      .then(resp => {
        // console.log('resp: ', resp);
        if (resp === null) {
          setLoading(false)
        }
        if (resp) {
          // Here I want to save the locations name, lat, lon, and the forecast url to the db.
          // console.log('resp: ', resp);
          params.url = resp.properties.forecast;
          // console.log('params: ', params);
          const match = favorites.find( elm => parseInt(elm.id) == parseInt(params.id))
          console.log('result: ', match);
          if (match === undefined) {
            console.log('no match');
            // Axios.post('/favorites/add-one', params)
            //   .then((response) => {
            //     console.log('axios post response: ', response);
            //   }).catch((error) => {
            //     console.log('error: ', error);
            //   });
          } else {
            console.log('match: ', match);
          }
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

  // console.log('forecast: ', forecast);
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
  padding-top: ${props => props.theme.spacing(2)}px;
  padding-bottom: ${props => props.theme.spacing(2)}px;
`;
const ElmCard = Styled(Card)`
  padding: ${props => props.theme.spacing(1)}px;
  margin: ${props => props.theme.spacing(.5)}px;
`;