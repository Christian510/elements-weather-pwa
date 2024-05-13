import { useState, useEffect } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
// import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// import ListItem from '@mui/material/ListItem';
// import ElmImg from '../../components/ElmImage/ElmImage';
import Styled from '@mui/system/styled';
import ElmSpinner from '../../components/ElmSpinner/ElmSpinner';
// import ElmList from '../../components/ElmList/ElmList';
import { ElmTheme } from '../../ElmThemeStyles/ElmTheme';
import { formatDateTime } from '../../models/date';
import { fetchAllData } from '../../models/weather_api';
import { styled, useTheme } from '@mui/material/styles';

export default function CurrentConditions() {
  const theme = useTheme();
  let { location } = useParams();
  const params = JSON.parse(location);
  // console.log('params: ', params);
  const [forecast, setForecast] = useState(null);
  const [isLoaded, setIsLoaded] = useState("false");

  useEffect(() => {
    console.log('useEffect fired')
    let isMounted = true;
    setForecast(null);
    fetchAllData(params).then(result => {
      // console.log("resp: ", result);
      if (!isMounted) {
        setForecast(result);
        setIsLoaded("true");
      }
    });
    console.log('forecast: ', forecast);
    return () => {
      console.log("UNMOUNTED")
      isMounted = false;
    };

  }, [isLoaded]);

  let dateTime = null, temp = null, tempUnit = null, detailedForecast = null, shortForecast = null, extendedForecast = null, icon = null;
  if (forecast) {
    // console.log("forecast: ", forecast)
    // console.log('date time: ', forecast.dateTime);
    dateTime = formatDateTime(forecast.dateTime.time);
    temp = forecast.forecast?.properties.periods[0].temperature;
    icon = forecast.forecast?.properties.periods[0].icon;
    tempUnit = forecast.forecast?.properties.periods[0].temperatureUnit;
    // detailedForecast = forecast.forecast?.properties.periods[0].detailedForecast;
    shortForecast = forecast.forecast?.properties.periods[0].shortForecast;
    extendedForecast = forecast.forecast?.properties.periods;
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
              padding: "4em 0 4em 0"
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

const Content = Styled(Typography)`
  padding-top: ${ElmTheme.spacing(2)}px;
  padding-bottom: ${ElmTheme.spacing(2)}px;
`;
const ElmCard = Styled(Card)`
  padding: ${ElmTheme.spacing(1)}px;
  margin: ${ElmTheme.spacing(.5)}px;
`;