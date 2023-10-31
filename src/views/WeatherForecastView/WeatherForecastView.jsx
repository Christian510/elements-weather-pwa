import React, { useMemo, useEffect, useState } from 'react';
import {
  useParams,
} from 'react-router-dom';
import { Box, Card, Container,  } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { styled } from '@mui/system';
import '../../styles/index.css';
import '../../styles/root.css';
import '../../styles/skeleton.css';
import { DateTime } from '../../models/date';
import { useFetchData } from '../../custom_hooks/useFetch';
import { useFetchUrl } from '../../custom_hooks/useFetchUrl';

// create a spinner to wait for the data to update?
// Save forecast to database button needed.


export default function WeatherForecast() {
  const [forecast, setForecast] = useState(null);
  
  let { city } = useParams();
  const c = JSON.parse(city);
  // console.log('params: ', c);
  const { url, fetching } = useFetchUrl(c);
  const { data, loading} = useFetchData(url)

  const properties = data?.properties;
  const dateTime = DateTime.convertISO8601Format(properties?.generatedAt);
  // console.log('properties: ', properties);
  
  // const example = styled('div')(
  //   ({ theme }) => `
  //     background: url(${data.somedata});
  //   `);

 // Need to add some logic to display an error message if the weather does not display or absent.
 const temp = properties?.periods[0].temperature;
 const icon = properties?.periods[0].icon;
 const tempUnit = properties?.periods[0].temperatureUnit;
 const detailedForecast = properties?.periods[0].detailedForecast;

  return (
    <>
    <Container id='forecast-view' maxWidth='xs'>
      <Card className='heading' >
        <p>{c.name}</p>
        <p className="date-time">{dateTime}</p>
        <p className="temperature">{temp} {tempUnit}</p>
        <img className="icon" src={icon} />
        <div className="today">{detailedForecast}</div>
      </Card>
    </Container>
    </>
  );
}