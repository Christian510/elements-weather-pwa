import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [form, setForm] = useState({
    email: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle reset password logic here
    alert('Prompt a password reset view')
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Forgot you Password?
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            label="Username"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
            autoComplete="name"
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
            fullWidth
          >
            Reset Password
          </Button>
        </Box>
        <Link >Return to Sign In</Link>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;