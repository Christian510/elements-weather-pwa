import Stack from '@mui/material/Stack';
import ForecastCard from '../ForecastCard/ForecastCard';
import ElmSpinner from '../../components/ElmSpinner/ElmSpinner';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
// import { formatDateTime } from '../../models/date';
import { parseUrl, convertDateStr } from '../../utils/utl_functions';
 
function Carousel({ forecast, loading=false }) {
    const hourly = forecast.hourlyForecast.properties.periods;
    // const daily = forecast.forecast.properties.periods;
    let hourlyCards = hourly.map((item, index) => (
        {
            key: item.key,
            title: forecast.location.name,
            icon: parseUrl(item.icon),
            forecast: item.shortForecast,
            temp: item.temperature,
            tempUnit: item.temperatureUnit,
            isDaytime: item.isDaytime,
            hour: index === 0 ? "Now" : convertDateStr(item.startTime),
        }
    ));

    // let dailyCards = daily.map((item, index) => (
    //     {
    //         key: item.number,
    //         title: forecast.location.name,
    //         dow: forecast.forecast.name, // Day of the week
    //         icon: item.icon,
    //         forecast: item.shortForecast,
    //         temp: item.temperature,
    //         tempUnit: item.temperatureUnit,
    //         isDaytime: item.isDaytime,
    //     }
    // ));
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
                            margin: '.5em auto',
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
                        {hourlyCards?.slice(0, 25).map((item, index) => {
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
                        )}
                    </Stack>
                )}
        </>
    )
};

export default Carousel;
