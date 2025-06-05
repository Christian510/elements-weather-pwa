import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import ElmLink from './ElmLink/ElmLink';

const ForgotUsername = () => {
  const [form, setForm] = useState({
    email: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle account creation logic here
    alert('Check your email!!')
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Provide your email address and we will send an email with your username.
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
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
            autoComplete="email"
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
            fullWidth
          >
            Email Username
          </Button>
        </Box>
      </Paper>
      <ElmLink to="/login" >Return to Sign In</ElmLink>
    </Container>
  );
};

export default ForgotUsername;