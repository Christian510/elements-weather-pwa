import React, { useState, useEffect } from "react";
import { Card, Drawer, IconButton, CardActions, Button } from "@mui/material";
// import { DeleteIcon } from "@mui/icons-material";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

// When card first mounts add eventListeners to the card.


// *** Created from Bard.  Needs testing and styling. *** //
export const CardWithDrawer = ({ location }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [deleteIconVisible, setDeleteIconVisible] = useState(false);

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
      style={{
        cursor: isDragging ? "grabbing" : "pointer",
        background: "blue",
        minHeight: '10rem'
      }}
    >
      {/* {location} */}
      Boise, ID
      50 degress
      sunny icon

      {deleteIconVisible && (
        <CardActions>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteSweepIcon />}
            onClick={() => {
              // Link to Detailed Forecast View.
            }}
          >
            Delete
          </Button>
        </CardActions>
      )}

      <Drawer open={drawerOpen} onClose={handleDrawerClose}>
        Drawer content here.
      </Drawer>
    </Card>
  );
};
