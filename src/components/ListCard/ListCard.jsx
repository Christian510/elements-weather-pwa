import React, { useState, useEffect } from "react";
import { styled } from '@mui/system';
import { Card, CardActions, Button, IconButton, Box } from "@mui/material";
import { DeleteIcon } from "@mui/icons-material";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

// When card first mounts add eventListeners to the card.


// *** Created from Bard.  Needs testing and styling. *** //
export default function ListCard({ location }) {
  // const [drawerOpen, setDrawerOpen] = useState('false');
  const [isDragging, setIsDragging] = useState('false');
  const [deleteIconVisible, setDeleteIconVisible] = useState('false');
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

  // 1. Create a style class to set the Card elemtn to absolute position and set itps position.
  // 2. handleDragStart: set the isDragging state to true.

  const handleDragStart = (event) => {
    console.log('setIsDragging')
    setIsDragging('true');
    console.log('event: ', event)
    const listCard = document.querySelector('.list-card');
    console.log('listCard: ', listCard)

  };

  const handleDragEnd = (event) => {
    // event.preventDefault();
    console.log('event: ', event)
    setIsDragging('false');

    // If the card has been dragged far enough to the left, reveal the delete icon.
    if (event.pageX < window.innerWidth / 4) {
      setDeleteIconVisible('true');
    } else {
      setDeleteIconVisible('false');
    }
  };

  // const handleDrawerOpen = () => {
  //   console.log('handleDrawerOpen')
  //   setDrawerOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   console.log('handleDrawerClose')
  //   setDrawerOpen(false);
  // };

  // const onMouseDown = document.addEventListener('mousedown', (event) => {
  //   console.log('startSlider', event.pageX)
  // })

  // const onMouseMove = document.addEventListener('mousemove', (event) => {
  //   console.log('onMouseMove: ', event.pageX)
  // })

  // const onMouseUp = document.addEventListener('mouseup', (event) => {
  //   console.log('onMouseUp: ', event.onMouseMove)
  // })

  // Using scoll snap to create the drag and delete button.  I may need to divide the delete button into seperate 
  // sections to get the delete button to snap to a small button position and then to a larger button position?
  // Experiment with the scroll snap properties to get the desired effect.
  return (
    <div className="list-card_container" style={{
      margin: '20px 0',
      
      }}>
      <div className="list-card" style={{ 
        scrollSnapType: 'x proximity', 
        scrollSnapAlign: 'center',
        display: 'flex',
        overflowX: 'scroll',
        scrollbarWidth: 'none',
        borderRadius: '15px',
        
        }} dir="ltr" >
        <Card
          draggable={isDragging}
          className="list-card"
          onTouchMove={handleDragStart}
          onTouchEnd={handleDragEnd}
          sx={{
            cursor: isDragging ? "grabbing" : "pointer",
            background: "White",
            backgroundImage: `url(${forecast?.icon})`,
            backgroundSize: 'cover',
            borderRadius: '15px',
            color: 'white',
            textShadow: '1px 1px 5px gray',
            width: '100%',
            flex: 'none',
          }}
        >
          <Grid container
            justifyContent='space-between'
            alignItems='center'
            spacing={{ xs: 2, md: 3, height: '100px' }} >
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
        {deleteIconVisible && (
          <CardActions sx={{
            width: '100%',
            flex: 'none',
            padding: '0',
            marginLeft: '12px',
          }}>
            <Button
              size="large"
              sx={{ 
                width: '100%', 
                height: '100%', 
                borderRadius: '15px', 
                padding: '8px 40px ',
                display: 'flex',
                justifyContent: 'flex-start',
              }}
              variant="contained"
              color="error"
              // startIcon={<DeleteSweepIcon fontSize="inherit" />}
              onClick={() => {
                console.log('delete')
              }}
            >
              <DeleteSweepIcon fontSize="large" />
              </Button>
          </CardActions>
        )}
      </div>
    </div>
  );
};
