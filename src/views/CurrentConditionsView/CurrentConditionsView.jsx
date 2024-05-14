import { useState, useEffect } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
import { useLoaderData, Form } from "react-router-dom";
import { fetchAllData } from '../../models/weather_api';
import { Button } from '@mui/material';
import { StyledButtonLink } from '../../components/StyledButtonLink';

export default function CurrentConditions() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { forecasts, sessionId } = useLoaderData();
  // console.log('loaderdata: ', forecasts);
  let { location } = useParams();
  const params = JSON.parse(location);
  // console.log('params: ', params);
  const [locationData, setLocationData] = useState(null);

  let match = forecasts.find((elm) => elm.location.location_id === params.location_id);
  useEffect(() => {
    if (match) {
      // console.log('match', match);
      setLocationData(match);
    }
    if (match === undefined) {
      // console.log('no match: ', match);
      fetchAllData(params)
        .then((result) => setLocationData(result));
    }

  }, [params, match]);

  // console.log('loationData: ', locationData);
  let dateTime = null, temp = null, tempUnit = null, detailedForecast = null, shortForecast = null, extendedForecast = null, icon = null, name = null, id = null;
  if (locationData) {
    dateTime = formatDateTime(locationData.dateTime.time);
    temp = locationData?.forecast.properties.periods[0].temperature;
    icon = locationData?.forecast.properties.periods[0].icon;
    name = locationData?.location.name;
    id = locationData?.location.location_id;
    // tempUnit = forecast?.properties.periods[0].temperatureUnit;
    // detailedForecast = forecast.forecast?.properties.periods[0].detailedForecast;
    shortForecast = locationData?.forecast.properties.periods[0].shortForecast;
    extendedForecast = locationData?.forecast.properties.periods;

  }

  function handleOnClick(id) {
    let shouldRedirect = false;
    console.log('clicked: ', id)
      return navigate('/');
  }

  const StyledForm = styled(Form)(({ theme }) => ({
    height: '100vh',
    backgroundColor: theme.palette.primary.light,
    backgroundImage: `url(${icon})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }));

  return (
    <>
      {!locationData ? (
        <ElmSpinner size='lg' />
      ) : (
        <StyledForm
          id="weather-forecast"
          method='post'
        >
          <Box
            display='flex'
            justifyContent='space-between'
          >
            <StyledButtonLink
              to={'/'}
              sx
              disableRipple={true}
              variant='text'
              color='primary'
            >Cancel</StyledButtonLink>
            {/* <Button href='/' disableRipple > Cancel</Button> */}
            <StyledButtonLink
              component={Button}
              disableRipple
              onClick={() => handleOnClick(id)}
              type='submit'
            >Add</StyledButtonLink>
          </Box>
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
              >{name}</Typography>
              <Typography
                className="temp"
                sx={{ paddingLeft: '.3em' }}
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
        </StyledForm>
      )}
    </>
  )
}