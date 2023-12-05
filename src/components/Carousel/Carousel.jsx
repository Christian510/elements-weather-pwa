import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Card, CardContent, Typography, ButtonBase, Paper, Container, Stack } from '@mui/material';
import ForecastCard from '../ForecastCard/ForecastCard';


const Carousel = ({ properties, loading }) => {

    console.log('properties: ', properties)


    const [cards, setCards] = useState([]);

    useEffect(() => {

        properties.periods.map((item, index) => {
            
            if (index > 0 && loading === false) {
                setCards((prev) => [...prev, {
                    title: item.name,
                    icon: item.icon,
                    forecast: item.shortForecast,
                    temp: item.temperature,
                    tempUnit: item.temperatureUnit,
                }])
            }
        }
        );
    }, [properties, loading]);

    return (
        <Stack
            direction='row'
            spacing={1}
            className='carousel'
            sx={{
                margin: (theme) => theme.spacing(2, .5),
                height: 280,
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
            }}
        >
            {cards.map((item, index) => (
                <ForecastCard
                    key={index}
                    title={item.title}
                    content={item.forecast}
                    direction='col'
                    square={false}
                    shape={{ height: 250, width: 150 }}
                    img={{ src: item.icon, alt: item.forecast }}
                    temp={{ temp: item.temp, tempUnit: item.tempUnit }}
                />
            ))}
        </Stack>
    );
};

export default Carousel;
