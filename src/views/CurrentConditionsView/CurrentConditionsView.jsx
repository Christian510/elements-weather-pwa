import { useRef } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// import ListItem from '@mui/material/ListItem';
// import ElmImg from '../../components/ElmImage/ElmImage';
import ElmSpinner from '../../components/ElmSpinner/ElmSpinner';
// import ElmList from '../../components/ElmList/ElmList';
import { formatDateTime } from '../../models/date';
import { styled, useTheme } from '@mui/material/styles';
import { useLoaderData } from "react-router-dom";

export default function CurrentConditions() {
  const { forecasts, sessionId } = useLoaderData();
  // console.log('loaderdata: ', forecasts);
  const theme = useTheme();
  let { location } = useParams();
  const params = JSON.parse(location);
  // console.log('params: ', params);
  let locationRef = useRef(null);
  for ( let i = 0; i < forecasts.length; i++) {
    if (params.location_id === forecasts[i].location.location_id) {
      locationRef = forecasts[i];
    }
  }
  // console.log('current forecast: ', locationRef);
  const forecast = locationRef.forecast;
  // console.log(forecast)
  let dateTime = null, temp = null, tempUnit = null, detailedForecast = null, shortForecast = null, extendedForecast = null, icon = null;
    // dateTime = locationRef.dateTime;
  if (forecast) {
    dateTime = formatDateTime(locationRef.dateTime.time);
    temp = forecast?.properties.periods[0].temperature;
    icon = forecast?.properties.periods[0].icon;
    // tempUnit = forecast?.properties.periods[0].temperatureUnit;
    // detailedForecast = forecast.forecast?.properties.periods[0].detailedForecast;
    shortForecast = forecast?.properties.periods[0].shortForecast;
    extendedForecast = forecast?.properties.periods;
  }
  return (
    <>
      {!forecast ? (
        <ElmSpinner size='lg' />
      ) : (
        <Container 
          id="weather-forecast"
          fixed
          maxWidth="sm"
          sx={{
            height: '100vh',
            backgroundColor: theme.palette.primary.light,
            backgroundImage: `url(${icon})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',

          }}

        >
          <Box
            id="scollable-view"
            display='flex'
            flexDirection='row'
            justifyContent='center'
          >
            <Box
            display="flex"
            flexDirection="column"
            // justifyContent="center"
            alignItems="center"
            sx={{
              padding: "4em 0 4em 0",
              color: theme.palette.text.primary,
              textShadow: '1px 1px 5px gray',
            }}
            >
              <Typography 
              className="location"
              variant='h4'
              >Heiley</Typography>
              <Typography 
              className="temp"
              sx={{paddingLeft: '.3em'}}
              variant='h1'
              >{temp}&deg;</Typography>
              <Typography 
                className="observation"
                textAlign='center'
                variant='body1'
                >{shortForecast}</Typography>
              <Typography className="high_low"></Typography>
            </Box>
          </Box>
        </Container>
      )}
    </>
  )
}

// const ContentBox = Styled(Card)(({ theme }) => ({
//   borderRadius: '8px',
//   backgroundColor: theme.palette.
// }));