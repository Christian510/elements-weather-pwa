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

  // until the data is fetched from the api, display a loading message.



  const renderPage = () => {
    if (loading === true && fetching === true) {
      console.log('loading: ', loading);
      return <div>Loading...</div>
    } else {
      console.log('loading: ', loading);
      setForecast(data?.properties);
      const dateTime = DateTime.convertISO8601Format(forecast.generatedAt);
    
      // Need to add some logic to display an error message if the weather does not display or absent.
      const temp = forecast.periods[0].temperature;
      const icon = forecast.periods[0].icon;
      const tempUnit = forecast.periods[0].temperatureUnit;
      const detailedForecast = forecast.periods[0].detailedForecast;
      return (
          <>
              <Card className='heading' >
              <p>{c.name}</p>
              <p className="date-time">{dateTime}</p>
              <p className="temperature">{temp} {tempUnit}</p>
              <img className="icon" src={icon} />
              <div className="today">{detailedForecast}</div>
            </Card>
            <div className="carousel">Forecast</div>
            <Carousel properties={forecast} />
            {/* <List className='extended-forecast'>
              {extendedForecast}
            </List> */}
          </>
      )
      
      
    }
  }
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
        {renderPage()}
      </Container>
    </>
  );
}