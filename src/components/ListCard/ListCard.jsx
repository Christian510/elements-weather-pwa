import React, { useState, useEffect } from "react";
import { styled } from '@mui/system';
import { Card, Drawer, IconButton, CardActions, Button, Avatar, Box } from "@mui/material";
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
    fetch('https://api.weather.gov/gridpoints/BGM/74,100/forecast')
      .then(response => response.json())
      .then(data => {
        // console.log('data: ', data);
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
          backgroundImage: `url(${forecast?.icon})`,
          backgroundSize: 'cover',
          maxHeight: '100px',
          margin: '20px 10px 20px 10px',
          borderRadius: '15px',
          minHeight: '120px',
          color: 'white',
          textShadow: '1px 1px 5px gray',
          overflowX: 'scroll',
        }}
      >
        <Grid container 
              justifyContent='space-between'
              alignItems='center'
              spacing={{ xs: 2, md: 3, height: '100px' }} >
          <Grid item xs={4} sm={4} md={4}>
            <Box
              display="flex"
              justifyContent='space-between'
              flexDirection='column'
              gap={4}
              p={2}
              sx={{ margin: 0 }} >
              <div>
                <h2>Boise</h2>
                <p>11:20AM</p>

              </div>
              <p>Sunny</p>
            </Box>
            </Grid>
          <Grid item xs={4} sm={4} md={4}>
          <Box
            display="flex"
            justifyContent='space-between'
            alignItems='center'
            flexDirection='column'
            gap={2}
            p={2}
            sx={{ margin: 0 }}  >
            <p style={{fontSize: '3em'}}>70&deg;</p>
            <p>H:75&deg; L:50&deg;</p>
          </Box>
          </Grid>
        </Grid>
        {deleteIconVisible && (
          <CardActions>
            <Button
              sx={{width: '100px', height: '100px', borderRadius: '12px'}}
              variant="contained"
              color="error"
              startIcon={<DeleteSweepIcon />}
              onClick={() => {
                console.log('delete')
              }}
            />
          </CardActions>
        )}

      </Card>
  );
};
