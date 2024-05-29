import React from 'react';
import Stack from '@mui/material/Stack';
import ForecastCard from '../ForecastCard/ForecastCard';
import ElmSpinner from '../../components/ElmSpinner/ElmSpinner';
import WeatherIcon from '../WeatherIcon/WeatherIcon';

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
            hour: item.number === 0 ? "Now" : hour, // Hour of the day
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
                    <Stack
                        direction='row'
                        spacing={1}
                        className='carousel'
                        sx={{
                            alignItems: 'center',
                            margin: (theme) => theme.spacing(-2, 0, 0, 0),
                            height: 270,
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
                                        isDaytime: item.isDaytime
                                    }}
                                    direction='col'
                                    square={false}
                                    shape={{ height: 230, width: 150 }}
                                    Icon={() => <WeatherIcon isDay={item.isDaytime} icon={item.icon} color={} />}
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
