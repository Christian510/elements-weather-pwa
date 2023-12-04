import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Card, CardContent, Typography, ButtonBase, Paper, Container, Stack } from '@mui/material';
import ForecastCard from '../ForecastCard/ForecastCard';


const Carousel = ({ properties }) => {

    console.log('properties: ', properties)


    const [cards, setCards] = useState([]);

    // properties.periods.map((item, index) => {

    //     if (index > 0 && properties.length) {
    //         setCards((prev) => [...prev, { 
    //             title: item.name, 
    //             icon: item.icon, 
    //             forecast: item.shoreForecast, 
    //             temp: item.temperature,
    //             tempUnit: item.temperatureUnit,}])
    //     }
    // }
    // );

    // console.log('cards: ', cards);

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
            {/* {cards.map((card, index) => (
                <ForecastCard 
                key={index} 
                title={card.title} 
                content={''} 
                direction='col'
                square={false}
                shape={{height: 250, width: 150}}
                img={{src: 'https://via.placeholder.com/125', alt: 'placeholder'}}
                />
            ))} */}
        </Stack>
    );
};

export default Carousel;
