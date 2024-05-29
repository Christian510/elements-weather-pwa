import React from 'react';
import { styled } from '@mui/material/styles';
import { CardContent, Typography, Paper, Box, Card } from '@mui/material';


const ForecastCard = ({ content, direction, square, shape, Icon }) => {
    // console.log('title: ', title);
    // console.log('content: ', content);
    // I need this to be a rectangle for the FavoritesView.
    // And a square for the extended forecast view.

    const Container = styled(Paper)({
        height: shape.height,
        width: shape.width,
        padding: '5px 5px',
        margin: '5px 5px',
    });

    const Content = styled(CardContent)({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    });

    return (
        <Container
            className='forecast-card'
            display='flex'
            flexdirection= {direction.col}
            elevation={5}
            square={square}>
            <Content>
                <Typography variant="subTitle1">{content.title}</Typography>
                <Icon />
                {/* <Typography variant="body2">{content.isDaytime ? 'High' : 'Low'} {content.temp.temp} {content.temp.tempUnit}</Typography> */}
                {/* <Typography variant="body2">{content.forecast}</Typography> */}
                <Typography variant="h5">{content.temp.temp}&deg;</Typography>
            </Content>
        </Container>
    );
};

export default ForecastCard;