import React from 'react';
import Stack from '@mui/material/Stack';
import ForecastCard from '../ForecastCard/ForecastCard';
import ElmSpinner from '../../components/ElmSpinner/ElmSpinner';


const Carousel = ({ forecast, loading }) => {
    // console.log('carousel forecast: ', forecast)
    // console.log('carousel loading: ', loading)

    let cards = forecast.periods.map((item, index) => (
        {
            key: index,
            title: item.name,
            icon: item.icon,
            forecast: item.shortForecast,
            temp: item.temperature,
            tempUnit: item.temperatureUnit,
            isDaytime: item.isDaytime,
        }
    ));

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
                        {cards.map((item, index) => {
                            if (index > 0) {
                                return <ForecastCard
                                    key={index}
                                    title={item.title}
                                    content={{
                                        forecast: item.forecast,
                                        temp: { temp: item.temp, tempUnit: item.tempUnit },
                                        isDaytime: item.isDaytime
                                    }}
                                    direction='col'
                                    square={false}
                                    shape={{ height: 230, width: 150 }}
                                    img={{ src: item.icon, alt: item.forecast }} />
                            }
                        }
                        )}
                    </Stack>
                )}
        </>
    )
};

export default Carousel;
