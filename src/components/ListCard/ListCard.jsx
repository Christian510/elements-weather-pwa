import React, { useState, useEffect } from "react";
import { createTheme, styled } from '@mui/system';
import { Card, CardActions, Button, Box } from "@mui/material";
// import { DeleteIcon } from "@mui/icons-material";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

// When card first mounts add eventListeners to the card.


// *** Created from Bard.  Needs testing and styling. *** //
export default function ListCard({ location }) {
  // const [drawerOpen, setDrawerOpen] = useState('false');
  const [isDragging, setIsDragging] = useState('false');
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    fetch('https://api.weather.gov/gridpoints/BGM/74,100/forecast')
      .then(response => response.json())
      .then(data => {
        // console.log('data: ', data);
        setForecast(data.properties.periods[0]);
      });
  }, [])
  // console.log('forecast: ', forecast);

  // Using scoll snap to create the drag and delete button.  I may need to divide the delete button into seperate 
  // sections to get the delete button to snap to a small button position and then to a larger button position?
  // Experiment with the scroll snap properties to get the desired effect.
  return (
    <div className="list-card_container" style={{
      margin: '1.25em auto',

    }}>
      <div className="list-card_scroll-behavior" style={{
        scrollSnapType: 'x mandatory',
        scrollBehavior: 'smooth',
        scrollSnapStop: 'always',
        display: 'flex',
        overflowX: 'scroll',
        scrollbarWidth: 'none',
        borderRadius: '15px',
        // height: '115px',
        height: 'auto',

      }} dir="ltr" >
        <Card
          draggable={isDragging}
          className="list-card"
          sx={{
            cursor: isDragging ? "grabbing" : "pointer",
            background: "White",
            backgroundImage: `url(${forecast?.icon})`,
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
              xs: 4, 
              md: 8, 
              // height: '100px'
              }} >
            <Grid xs={4} sm={4} md={4}>
              <Box
                display="flex"
                justifyContent='space-between'
                flexDirection='column'
                gap={4}
                p={2}
                sx={{ margin: 0, width: '100%', flex: 'none' }} >
                <div>
                  <h2>Boise</h2>
                  <p>11:20AM</p>
                </div>
                <p>Sunny</p>
              </Box>
            </Grid>
            <Grid xs={4} sm={4} md={4}>
              <Box
                display="flex"
                justifyContent='space-between'
                alignItems='center'
                flexDirection='column'
                gap={2}
                p={2}
                sx={{ margin: 0 }}  >
                <p style={{ fontSize: '3em' }}>70&deg;</p>
                <p>H:75&deg; L:50&deg;</p>
              </Box>
            </Grid>
          </Grid>
        </Card>
        <Button
          className="delete-button_a"
          size="large"
          sx={{
            width: '6.25em',
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
        <Button
          className="delete-button_b"
          variant="contained"
          color="error"
          sx={{
            width: '100%',
            borderRadius: 'unset',
            padding: '8px 40px ',
            scrollSnapAlign: 'center',
            scrollMarginLeft: '12.5em',
            flex: 'none',
            borderTopRightRadius: '15px',
            borderBottomRightRadius: '15px',
          }} />
      </div>
    </div>
  );
};

// Add scrollSnapAlign: 'center', to Button.  and resize it so it will display as a button on left of view.