import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import ForecastCard from '../ForecastCard/ForecastCard';
import ElmSpinner from '../../components/ElmSpinner/ElmSpinner';
import WeatherIcon from '../WeatherIcon/WeatherIcon';

function Carousel({ forecast, timeAlocated=10}) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (forecast) {
            setLoading(false);
        }
        return () => {
            setLoading(true);
        }
    }, [forecast]);

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
                        {forecast?.slice(0, timeAlocated).map((item, index) => {
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
                                Icon={() => <WeatherIcon isDay={item.isDaytime} iconObj={item.iconObj} size="med" color='white' />}
                                />
                        }
                        )}
                    </Stack>
                )}
        </>
    )
};

export default Carousel;
