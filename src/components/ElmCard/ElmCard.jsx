import React from 'react';
import { styled } from '@mui/system';
import { Card, CardContent, Typography, Paper } from '@mui/material';

const CustomCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
//   boxShadow: theme.shadows[1], // Paper elevation of 1
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const IconWrapper = styled('div')({
  marginRight: (theme) => theme.spacing(2),
  fontSize: 48, // Adjust the size of the icon as needed
});

const TextContainer = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
    alignItems: 'flex-start',
});

const ElmCard = ({ name, shortForecast, detailedForecast, icon }) => {
  return (
    <CustomCard as={Paper}>
      <IconWrapper>
        <img src={icon} alt={shortForecast + ' icon'} />
      </IconWrapper>
      <TextContainer>
        <Typography variant="body1">{name}</Typography>
        <Typography variant="body2">{detailedForecast}</Typography>
      </TextContainer>
    </CustomCard>
  );
};

export default ElmCard;

