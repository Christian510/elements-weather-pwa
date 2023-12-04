import React, { useState } from 'react';
import ElmCard from '../../components/ElmCard/ElmCard';
import Carousel from '../../components/Carousel/Carousel';
import {
  useParams,
} from 'react-router-dom';
import { Box, Card, Container, Button, List  } from '@mui/material';
import { DateTime } from '../../models/date';
import { useFetchData } from '../../custom_hooks/useFetch';
import { useFetchUrl } from '../../custom_hooks/useFetchUrl';

// create a spinner to wait for the data to update?
// Save forecast to database button needed.


export default function CurrentConditions() {

  const [forecast, setForecast] = useState(null);

  let { city } = useParams();
  const c = JSON.parse(city);
  // console.log('params: ', c);
  const { url, fetching } = useFetchUrl(c);
  const { data, loading } = useFetchData(url)

  console.log('data: ', data);

  const properties = data?.properties;
  // setForecast(data?.properties);
  // console.log('forecast: ', forecast);
  const dateTime = DateTime.convertISO8601Format(properties?.generatedAt);
  // console.log('properties: ', properties);

  // Need to add some logic to display an error message if the weather does not display or absent.
  const temp = properties?.periods[0].temperature;
  const icon = properties?.periods[0].icon;
  const tempUnit = properties?.periods[0].temperatureUnit;
  const detailedForecast = properties?.periods[0].detailedForecast;

  // Extended forecast for 7 days

  // const extendedForecast = properties?.periods.map((item, index) =>
  // {
    
  //   if (index > 0) {
  //     // console.log('item: ', item.name);
  //     return (
  //       <ElmCard
  //         key={index}
  //         name={item.name}
  //         detailedForecast={item.detailedForecast}
  //         icon={item.icon}
  //         shortForecast={item.shortForecast} />
  //     );
  //   }
  // }
  // );

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
        <div className="carousel">Forecast</div>
        {/* <Carousel properties={properties} /> */}
        
        {/* <List className='extended-forecast'>
          {extendedForecast}
        </List> */}
      </Container>
    </>
  );
}