import { useState } from 'react';
import {
  Box,
  Button,
  // Container,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import ElmLink from '../../components/ElmLink/ElmLink';
import ElmContainer from '../../components/ElmContainer';
import ElmFooter from '../../components/ElmFooter/ElmFooter';

const LoginView = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle Login logic here
    /**
     * 1. Fetch login creds from db.
     * 2. If user does not successfully login display login failure message.
     */
    alert('Logged In!!')
  };

  return (
    <ElmContainer maxWidth="md">
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
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
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
            autoComplete="name"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
            autoComplete="new-password"
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
            fullWidth
          >
            Login
          </Button>
        </Box>
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            padding: '.5em',
            gap: 2,
            }} >
            <ElmLink id="forgot-password" to="/forgot_password">
              <Typography >Forgot Password</Typography>
            </ElmLink>
            <Typography > | </Typography>
            <ElmLink id="forgot-username" to="/forgot_username">
              <Typography >Forgot Username</Typography>
            </ElmLink>
        </Box>
      </Paper>
      <ElmFooter />
    </ElmContainer>
  );
};

export default LoginView;