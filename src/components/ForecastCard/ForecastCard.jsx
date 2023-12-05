import React from 'react';
import { styled } from '@mui/material/styles';
import { CardContent, Typography, Paper } from '@mui/material';


const ForecastCard = ({ title, content, direction, square, shape, img }) => {
    console.log('title: ', title);
    console.log('content: ', content);
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
            display='flex'
            flexdirection= {direction.col}
            elevation={12}
            square={square}>
            <Content>
                <Typography variant="subTitle1">{title}</Typography>
                <img src={img.src} alt={img.alt} />
                <Typography variant="body2">{content}</Typography>
            </Content>
        </Container>
    );
};

export default ForecastCard;