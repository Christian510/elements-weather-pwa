import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ForecastCard from '../ForecastCard/ForecastCard';
import ElmSpinner from '../../components/ElmSpinner/ElmSpinner';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import { formatDateTime } from '../../models/date';

function parseUrl(url) {
    const nUrl = new URL(url);
    const path = nUrl.pathname.split('/');
    // console.log('path: ', path);
    // const parts = path.split('/');
    // console.log('parts: ', parts);
    const iconClass = path[path.length - 1].split(',')[0];
    // console.log('icon: ', iconClass);
    return iconClass;
}

const Carousel = ({ forecast, loading=false }) => {
    console.log('forecast: ', forecast);
    let currentHour = new Date();
    const hour = currentHour.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })
    const hourly = forecast.hourlyForecast.properties.periods;
    const daily = forecast.forecast.properties.periods;
    console.log('hourly: ', hourly[0]);
    const date = formatDateTime(hourly[0].startTime);
    console.log('date: ', date);
    // console.log('daily: ', daily);

    let hourlyCards = hourly.map((item, index) => (
        {
            key: item.number,
            title: forecast.location.name,
            icon: parseUrl(item.icon),
            forecast: item.shortForecast,
            temp: item.temperature,
            tempUnit: item.temperatureUnit,
            isDaytime: item.isDaytime,
            hour: item.number === 1 ? "Now" : hour, // Hour of the day
        }
    ));

    let dailyCards = daily.map((item, index) => (
        {
            key: item.number,
            title: forecast.location.name,
            dow: forecast.forecast.name, // Day of the week
            icon: item.icon,
            forecast: item.shortForecast,
            temp: item.temperature,
            tempUnit: item.temperatureUnit,
            isDaytime: item.isDaytime,
        }
    ));
    // loading = forecast.length === 0 ? true : false;

    return (
        <>
            {loading ?
                (
                    <ElmSpinner size='md' />
                ) : (
                    // div here with extended forecast and line under it
                    <Stack
                        className='carousel'
                        direction='row'
                        spacing={.15}
                        sx={{
                            backgroundColor: theme => theme.palette.primary.dark,
                            alignItems: 'center',
                            margin: '0 auto',
                            height: '100%',
                            maxHeight: '10em',
                            width: '100%',
                            borderRadius: '8px',
                            maxWidth: '23em',
                            overflowX: 'scroll',
                            scrollBehavior: 'smooth',
                            scrollSnapType: 'x mandatory',
                            '&::-webkit-scrollbar': {
                                display: 'none',
                            },
                            '& > *': {
                                flexShrink: 0,
                                scrollSnapAlign: 'start',
                            },
                        }}>
                        {hourlyCards.map((item, index) => {
                            if (index > 0) {
                                return <ForecastCard
                                    key={index}
                                    content={{
                                        forecast: item.forecast,
                                        temp: { temp: item.temp, tempUnit: item.tempUnit },
                                        isDaytime: item.isDaytime,
                                        hour: item.hour
                                    }}
                                    // direction='col'
                                    shape={{ height: 230, width: 150 }}
                                    Icon={() => <WeatherIcon isDay={item.isDaytime} icon={item.icon} size="med" />}
                                    />
                            }
                        }
                        )}
                    </Stack>
                )}
        </>
    )
};

export default Carousel;
