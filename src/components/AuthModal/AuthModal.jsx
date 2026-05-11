import { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../../contexts/AuthContext';

const FIREBASE_ERRORS = {
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password.',
  'auth/invalid-credential': 'Invalid email or password.',
  'auth/email-already-in-use': 'An account with this email already exists.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/weak-password': 'Password must be at least 6 characters.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
  'auth/popup-closed-by-user': 'Sign-in popup was closed before completing.',
};

const GoogleG = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.013 17.64 11.707 17.64 9.2z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

export default function AuthModal({ open, onClose }) {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function reset() {
    setEmail('');
    setPassword('');
    setError('');
  }

  function toggleMode() {
    setMode((m) => (m === 'login' ? 'create' : 'login'));
    setError('');
  }

  function handleClose() {
    reset();
    onClose();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (mode === 'login') {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      reset();
      onClose();
    } catch (err) {
      setError(FIREBASE_ERRORS[err.code] ?? 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogle() {
    setError('');
    setSubmitting(true);
    try {
      await signInWithGoogle();
      reset();
      onClose();
    } catch (err) {
      setError(FIREBASE_ERRORS[err.code] ?? 'Google sign-in failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          overflowY: 'auto',
          borderRadius: 0,
          p: 3,
          outline: 'none',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: -1 }}>
          <IconButton size="small" onClick={handleClose} aria-label="close">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            borderRadius: 1,
            p: 1.5,
            mb: 2.5,
          }}
        >
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            When you create an account, your weather favorites are saved forever!
            As an anonymous user your weather favorites are stored for 3 months.
            So create an account and become a member. It's free!
          </Typography>
        </Box>

        <Typography variant="h6" align="center" gutterBottom>
          {mode === 'login' ? 'Login' : 'Create Account'}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            autoComplete="email"
            size="small"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            size="small"
          />

          {error && (
            <Typography variant="body2" color="error" role="alert">
              {error}
            </Typography>
          )}

          <Button type="submit" variant="contained" fullWidth disabled={submitting}>
            {mode === 'login' ? 'Login' : 'Create Account'}
          </Button>
        </Box>

        <Divider sx={{ my: 2 }}>or</Divider>

        <Button
          variant="outlined"
          fullWidth
          startIcon={<GoogleG />}
          onClick={handleGoogle}
          disabled={submitting}
          sx={{ textTransform: 'none' }}
        >
          Continue with Google
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <Button
            variant="text"
            size="small"
            onClick={toggleMode}
            sx={{ p: 0, minWidth: 'auto', textTransform: 'none', verticalAlign: 'baseline' }}
          >
            {mode === 'login' ? 'Create one' : 'Login'}
          </Button>
        </Typography>
      </Paper>
    </Modal>
  );
}
