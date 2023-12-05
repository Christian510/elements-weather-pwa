import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Card, CardContent, Typography, ButtonBase, Paper, Container, Stack } from '@mui/material';
import ForecastCard from '../ForecastCard/ForecastCard';


const Carousel = ({ forecast, loading }) => {
        // console.log('forecast: ', forecast)
        // console.log('loading: ', loading)
    const [cards, setCards] = useState([]);

    useEffect(() => {
        // console.log('is loading: ', loading)
        // console.log('cards updated: ', forecast)

        if (loading === false) {
            let updateCards = forecast.periods.map((item, index) => (
                {
                    key: index,
                    title: item.name,
                    icon: item.icon,
                    forecast: item.shortForecast,
                    temp: item.temperature,
                    tempUnit: item.temperatureUnit,
                }
            ));

            // console.log('updatedCards: ', updateCards);
            setCards(updateCards);
            // setCards((preState) => {
            //     return [...preState, ...updateCards]
            // })

        }



    }, [forecast]);

    console.log('cards updated: ', cards)



    // useEffect(() => {
    //     console.log('cards updated: ', cards)
    // }, [cards]);
    // if (loading) {
    //     return (<div>Loading...</div>)
    // } else {

    //     return (
    //         <Stack
    //             direction='row'
    //             spacing={1}
    //             className='carousel'
    //             sx={{
    //                 margin: (theme) => theme.spacing(2, .5),
    //                 height: 280,
    //                 overflowX: 'scroll',
    //                 scrollBehavior: 'smooth',
    //                 scrollSnapType: 'x mandatory',
    //                 '&::-webkit-scrollbar': {
    //                     display: 'none',
    //                 },
    //                 '& > *': {
    //                     flexShrink: 0,
    //                     scrollSnapAlign: 'start',
    //                 },
    //             }}
    //         >
    //             {cards.map((item, index) => (
    //                 <ForecastCard
    //                     key={index}
    //                     title={item.title}
    //                     content={item.forecast}
    //                     direction='col'
    //                     square={false}
    //                     shape={{ height: 250, width: 150 }}
    //                     img={{ src: item.icon, alt: item.forecast }}
    //                     temp={{ temp: item.temp, tempUnit: item.tempUnit }}
    //                 />
    //             ))}
    //         </Stack>
    //     );
    // }

};

export default Carousel;
