import React from "react";
import { Card, Drawer, IconButton, CardActions, Button } from "@mui/material";
import { DeleteIcon } from "@mui/icons-material";

// *** Created from Bard.  Needs testing and styling. *** //
const CardWithDrawer = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [deleteIconVisible, setDeleteIconVisible] = React.useState(false);

  const handleDragStart = (event) => {
    setIsDragging(true);
  };

  const handleDragEnd = (event) => {
    setIsDragging(false);

    // If the card has been dragged far enough to the left, reveal the delete icon.
    if (event.pageX < window.innerWidth / 4) {
      setDeleteIconVisible(true);
    } else {
      setDeleteIconVisible(false);
    }
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Card
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{
        cursor: isDragging ? "grabbing" : "pointer",
      }}
    >
      {children}

      {deleteIconVisible && (
        <CardActions>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => {
              // Handle delete action here.
            }}
          >
            Delete
          </Button>
        </CardActions>
      )}

      <Drawer open={drawerOpen} onClose={handleDrawerClose}>
        // Drawer content here.
      </Drawer>
    </Card>
  );
};

export default CardWithDrawer;
