import React from 'react';
import { styled } from '@mui/material/styles';
import { CardContent, Typography, Paper } from '@mui/material';


const ForecastCard = ({ title, content, direction, square, shape, img }) => {

    // I need this to be a rectangle for the FavoritesView.
    // And a square for the extended forecast view.

    const Container = styled(Paper)({
        height: shape.height,
        width: shape.width,
        padding: '5px 5px',
        margin: '5px 5px',
    });
    
    return (
        <Container
            display='flex'
            flexdirection= {direction.col}
            elevation={12}
            square={square}>
            <CardContent>
                <Typography variant="subTitle1">{title}</Typography>
                <img src={img.src} alt={img.alt} />
                <Typography variant="body2">{content}</Typography>
            </CardContent>
        </Container>
    );
};

export default ForecastCard;