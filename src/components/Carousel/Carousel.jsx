import React from 'react';
import Stack from '@mui/material/Stack';
import ForecastCard from '../ForecastCard/ForecastCard';
import ElmSpinner from '../../components/ElmSpinner/ElmSpinner';


const Carousel = ({ forecast, loading=false }) => {
    console.log('forecast: ', forecast);

    let cards = [1,2,3,4,5,6].map((item, index) => (
        {
            key: index,
            title: "Boise",
            icon: "icon",
            forecast: "chance of showers",
            temp: "70",
            tempUnit: "F",
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
