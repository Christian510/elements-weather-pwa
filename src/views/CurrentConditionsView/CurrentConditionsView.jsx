import { useState, useEffect } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import { useParams, useNavigate } from 'react-router-dom';
// import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// import ListItem from '@mui/material/ListItem';
// import ElmImg from '../../components/ElmImage/ElmImage';
import ElmSpinner from '../../components/ElmSpinner/ElmSpinner';
// import ElmList from '../../components/ElmList/ElmList';
// import { formatDateTime } from '../../models/date';
import { styled, useTheme } from '@mui/material/styles';
import { useLoaderData } from "react-router-dom";
import { fetchAllData, addFavorite } from '../../models/weather_api';
import { Button } from '@mui/material';
import { StyledButtonLink } from '../../components/StyledButtonLink';
// import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ElmFooter from '../../components/ElmFooter/ElmFooter';

export default function CurrentConditions() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { forecasts, sessionId } = useLoaderData();
  let { location } = useParams();
  const [locationData, setLocationData] = useState(null);
  const [match, setMatch] = useState(false);
  // const [hourly, setHourly] = useState();

  useEffect(() => {
    const params = JSON.parse(location);

    // pull locationData from Carousel and set to state here. 

    const match = forecasts.find((elm) => elm.location.location_id === params.location_id);
    if (match) {
      setLocationData(match);
      setMatch(true);
    }
    if (match === undefined) {
      setMatch(false);
      setTimeout(() => {
        fetchAllData(params)
          .then((result) => setLocationData(result));
      }, 50);
    }
    return () => {
      setLocationData(null);
      setMatch(false);
    }

  }, [location, forecasts, sessionId]);

  // let dateTime = null;
  let temp = null;
  // let tempUnit = null;
  // let detailedForecast = null;
  let shortForecast = null;
  // let extendedForecast = null;
  let icon = null;
  let name = null;
  if (locationData) {
    // dateTime = formatDateTime(locationData.dateTime.time);
    temp = locationData?.forecast.properties.periods[0].temperature;
    icon = locationData?.forecast.properties.periods[0].icon;
    name = locationData?.location.name;
    // tempUnit = forecast?.properties.periods[0].temperatureUnit;
    // detailedForecast = forecast.forecast?.properties.periods[0].detailedForecast;
    shortForecast = locationData?.forecast.properties.periods[0].shortForecast;
    // extendedForecast = locationData?.forecast.properties.periods;

  }

  function handleAddFavorite(location, sessionID) {
    setTimeout(() => {
      addFavorite(location, sessionID).then(resp => {
        // if undefined, then something is wrong
        console.log("addFavorite resp: ", resp);
        if (resp === undefined) {
          alert('Location Not added to favorites. Please try again.')
          return;
        }
        if (resp.result === 1) {
          return navigate('/');
        }
        if (resp.result === 0) {
          alert('Location Not added to favorites. Please try again.')
        }
      })
    }, 50);
  }

  const StyledContainer = styled(Box)(({ theme }) => ({
    height: '100%',
    backgroundColor: theme.palette.primary.light,
    backgroundImage: `url(${icon})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: theme.zIndex.outlet = theme.zIndex.modal,
  }));

  return (
    <>
      {!locationData ? (
        <ElmSpinner size='lg' />
      ) : (
        <StyledContainer
          id="weather-forecast"
          display='flex'
          flexDirection='column'
        >
          <Box
            id="top-nav"
            display='flex'
            justifyContent='space-between'
            sx={{
              padding: '0.5em 0 0.5em 0',
            }}
          >
            {!match && (
              <>
                <StyledButtonLink
                  to={'/'}
                  sx
                  disableRipple={true}
                  variant='text'
                  color='primary'
                >Cancel</StyledButtonLink>
                <StyledButtonLink
                  component={Button}
                  disableRipple
                  onClick={() => handleAddFavorite(locationData.location, sessionId)}
                  type='submit'
                >Add</StyledButtonLink>
              </>
            )}
          </Box>
          <Box
            id="scollable-view"
            display='flex'
            flexDirection='column'
            sx={{
              height: '100%',
              overflowY: 'auto',
            }}
          >
            <Box
              id="forecast"
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
            <Carousel forecast={locationData} />
          </Box>
          {/* <Box
            id="bottom-nav"
            display='flex'
            justifyContent='space-between'
            sx={{
              padding: '0.5em 0 0.5em 0',
            }}
          > */}
            {match && (
              <>
                <ElmFooter />
                {/* <StyledButtonLink
                  to={`#`}
                  sx
                  disableRipple={true}
                  variant='text'
                  color='primary'
                >Map
                </StyledButtonLink>
                <StyledButtonLink
                  to={'/'}
                  sx
                  disableRipple={true}
                  variant='text'
                  color='primary'
                >
                  <FormatListBulletedIcon fontSize='small' />
                </StyledButtonLink> */}
              </>
            )}
          {/* </Box> */}
        </StyledContainer>
      )}
    </>
  )
}