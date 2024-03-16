import React, { useState, useEffect } from "react";
import { styled } from '@mui/system';
import { Card, Drawer, IconButton, CardActions, Button, Avatar } from "@mui/material";
import { DeleteIcon } from "@mui/icons-material";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

// When card first mounts add eventListeners to the card.


// *** Created from Bard.  Needs testing and styling. *** //
export default function ListCard({ location }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [deleteIconVisible, setDeleteIconVisible] = useState(false);
  const [forecast, setForecast] = useState(null);
  useEffect(() => {
    fetch('https://api.weather.gov/gridpoints/OTX/173,115/forecast')
      .then(response => response.json())
      .then(data => {
        console.log('data: ', data);
        setForecast(data.properties.periods[0]);
      });
  }, [])
  console.log('forecast: ', forecast);

  const handleDragStart = (event) => {
    console.log('setIsDragging')
    setIsDragging(true);
  };

  const handleDragEnd = (event) => {
    console.log(`X: ${event.pageX}`)
    setIsDragging(false);

    // If the card has been dragged far enough to the left, reveal the delete icon.
    if (event.pageX < window.innerWidth / 4) {
      setDeleteIconVisible(true);
    } else {
      setDeleteIconVisible(false);
    }
  };

  const handleDrawerOpen = () => {
    console.log('handleDrawerOpen')
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    console.log('handleDrawerClose')
    setDrawerOpen(false);
  };

  const onMouseDown = document.addEventListener('mousedown', (event) => {
    console.log('startSlider', event.pageX)
  })

  const onMouseMove = document.addEventListener('mousemove', (event) => {
    console.log('onMouseMove: ', event.pageX)
  })

  const onMouseUp = document.addEventListener('mouseup', (event) => {
    console.log('onMouseUp: ', event.onMouseMove)
  })

  return (
    <Card
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sx={{
        cursor: isDragging ? "grabbing" : "pointer",
        background: "White",
        maxHeight: '100px',
        margin: '20px 10px 20px 10px',
        borderRadius: '15px',
      }}
    >
      <Grid container spacing={2}>
        <Grid xs >
          <Avatar
            variant='square'
            src={forecast?.icon} alt={forecast?.shortForecast}
            sx={{ height: 'fit-content', width: 100 }}
          />
        </Grid>
        <Grid container spacing={8}>
          <Grid xs display="flex" justifyContent="center" alignItems="center" >
            <p>Boise</p>
            <p>11:20AM</p>
            <p>Sunny</p>
          </Grid>
          <Grid xs display="flex" justifyContent="center" alignItems="center" >
            <h3>70&deg;</h3>
            <p>H:75&deg; L:50&deg;</p>
          </Grid>
        </Grid>
      </Grid>
      {/* <p>{forecast.temperature}</p> */}


      {deleteIconVisible && (
        <CardActions>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteSweepIcon />}
            onClick={() => {
              console.log('delete')
            }}
          >
            Delete
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
