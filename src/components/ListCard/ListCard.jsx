import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import { Card, Button, Box } from "@mui/material";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { formatDateTime } from '../../models/date.js';
import ElmTheme from '../../ElmThemeStyles/ElmTheme.js';

function noForecastData() {
  //  Possibly use this as a way to address missing forecast data
  // if no date display noForecastData comp. in place of card in ListCard
  
}

export default function ListCard({ data, sessionId, deleteFavorite }) {
  // console.log("data: ", data)
  let icon = null, temp = null, tempUnit = null, shortForecast = "Oops can't retrieve the forecast!", time = null;
  if (data.forecast) {
    icon = data?.forecast.properties.periods[0].icon;
    temp = data?.forecast.properties.periods[0].temperature;
    tempUnit = data?.forecast.properties.periods[0].temperatureUnit;
    shortForecast = data?.forecast.properties.periods[0].shortForecast;
  }
  if (data.dateTime) {
    const dateTime = formatDateTime(data?.dateTime.time);
    time = dateTime.time;
  }
  const name = data?.location.name;
  
  // const [drawerOpen, setDrawerOpen] = useState('false');
  // const [isDragging, setIsDragging] = useState('false');
  // console.log('theme: ', ElmTheme)
  return (
    <StyledContainer className="list-card_container" >
      <StyleScrollBehavior className="list-card_scroll-behavior"  dir="ltr" >
        <Card
          // draggable={isDragging}
          className="list-card"
          sx={{
            // cursor: isDragging ? "grabbing" : "pointer",
            background: ElmTheme.palette.info.main,
            backgroundImage: `url(${icon})`,
            backgroundSize: 'cover',
            borderRadius: '15px',
            color: 'white',
            textShadow: '1px 1px 5px gray',
            width: '100%',
            marginRight: '.5em',
            flex: 'none',
            scrollSnapAlign: 'center',
          }}
        >
          <Grid container
            justifyContent='space-between'
            alignItems='center'
            spacing={{ 
              xs: 6, 
              md: 8, 
              }} >
            <Grid xs={5} sm={5} md={5}>
              <Box
                display="flex"
                justifyContent='space-between'
                flexDirection='column'
                gap={2}
                p={2}
                sx={{ margin: 0, width: '100%', flex: 'none' }} >
                <div>
                  <h2>{name}</h2>
                  <p>{time}</p>
                </div>
                <p>{shortForecast}</p>
              </Box>
            </Grid>
            <Grid xs={4.5} sm={4} md={2}>
              <Box
                display="flex"
                justifyContent='space-between'
                alignItems='center'
                flexDirection='column'
                gap={2}
                p={2}
                sx={{ margin: 0 }}  >
                <h1>{temp}&deg; {tempUnit}</h1>
                {/* <p>H:75&deg; L:50&deg;</p> */}
              </Box>
            </Grid>
          </Grid>
        </Card>
        <Button
          className="delete-button_a"
          size="large"
          sx={{
            width: '7em',
            borderRadius: 'unset',
            borderTopLeftRadius: '15px',
            borderBottomLeftRadius: '15px',
            padding: '8px 40px ',
            scrollSnapAlign: 'end',
            flex: 'none',
          }}
          variant="contained"
          color="error"
          onClick={() => {
            console.log('delete')
          }}
        >
          <DeleteSweepIcon fontSize="large" />
        </Button>

      </StyleScrollBehavior>
    </StyledContainer>
  );
};

const StyledContainer = styled('div')`
  margin: 1.25em auto;
`;
const StyleScrollBehavior = styled('div')`
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scroll-snap-stop: always;
  display: flex;
  align-items: stretch;
  overflow-x: scroll;
  scrollbar-width: none;
  border-radius: 15px;
  max-height: 7.5em;
`;