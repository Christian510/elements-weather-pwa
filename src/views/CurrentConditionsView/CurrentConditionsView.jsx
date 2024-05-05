import { useState, useEffect } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ElmImg from '../../components/ElmImage/ElmImage';
import Styled from '@mui/system/styled';
import ElmSpinner from '../../components/ElmSpinner/ElmSpinner';
import ElmList from '../../components/ElmList/ElmList';
import { ElmTheme } from '../../ElmThemeStyles/ElmTheme';
import { formatDateTime } from '../../models/date';
import { fetchAllData } from '../../models/weather_api';

export default function CurrentConditions() {
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
                    <Content variant='subtitle2'>{dateTime.date} {dateTime.time}</Content>
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

            </Grid>
          </Card>
          <Container
            sx={{
              padding: 0,
            }}
          >
            {forecast.forecast && <Carousel id='Carousel' forecast={forecast.forecast.properties.periods} loading={isLoaded} />}
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