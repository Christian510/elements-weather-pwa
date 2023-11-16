import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Modal,
  Backdrop,
  Fade,
  TextField,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const UserSessionModal = ({ open, handleClose }) => {
  const classes = useStyles();
  const [sessionName, setSessionName] = useState('');

  const handleInputChange = (event) => {
    setSessionName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle submission, e.g., send sessionName to a function or API
    console.log('Session Name:', sessionName);
    handleClose(); // Close modal after submission
  };

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Name Your Session</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              id="session-name"
              label="Session Name"
              variant="outlined"
              value={sessionName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default UserSessionModal;
