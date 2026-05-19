import { useState, useEffect } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Button,
  Grid,
  InputAdornment,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import ElmSkeleton from '../../components/ElmSkeleton/ElmSkeleton';

const glassCard = {
  background: 'rgba(255,255,255,0.15)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: '16px',
  p: 2.5,
  mb: 3,
};

const glassInput = {
  '& .MuiOutlinedInput-root': {
    bgcolor: 'rgba(255,255,255,0.12)',
    borderRadius: '12px',
    color: 'white',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.25)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
    '&.Mui-focused fieldset': { borderColor: 'rgba(255,255,255,0.75)' },
    '& input::placeholder': { color: 'rgba(255,255,255,0.4)' },
    '& input.Mui-disabled': { WebkitTextFillColor: 'rgba(255,255,255,0.5)' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.65)' },
  '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
  '& .MuiInputLabel-root.Mui-disabled': { color: 'rgba(255,255,255,0.35)' },
};

export default function AccountView() {
  const { user, profile, saveProfile } = useAuth();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [editMode, setEditMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    lat: '',
    lng: '',
  });

  useEffect(() => {
    if (user === null) navigate('/');
  }, [user, navigate]);

  useEffect(() => {
    if (!profile) return;
    setForm({
      firstName: profile.firstName ?? '',
      lastName: profile.lastName ?? '',
      city: profile.city ?? '',
      state: profile.state ?? '',
      lat: profile.lat ?? '',
      lng: profile.lng ?? '',
    });
  }, [profile]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePasswordReset = async () => {
    if (!user?.email || resetSent) return;
    try {
      await sendPasswordResetEmail(auth, user.email);
      setResetSent(true);
    } catch (err) {
      console.error('Password reset error:', err);
    }
  };

  const handleSave = async () => {
    try {
      await saveProfile(form);
      setEditMode(false);
    } catch (err) {
      console.error('Failed to save profile:', err);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure? This will permanently remove all your saved locations and weather preferences.')) {
      // TODO: call user.delete() and clean up backend data
    }
  };

  const displayName = [profile?.firstName, profile?.lastName].filter(Boolean).join(' ') || user?.email || '';
  const avatarInitial = profile?.firstName?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? '?';

  if (navigation.state === 'loading' && navigation.location?.pathname === '/') {
    return (
      <Box sx={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', pt: 8 }}>
        <ElmSkeleton count={5} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #1565C0 0%, #1e88e5 45%, #64b5f6 100%)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 1,
          pt: 2,
          pb: 1,
        }}
      >
        <IconButton onClick={() => navigate(-1)} sx={{ color: 'white' }}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
          Profile
        </Typography>
        <IconButton onClick={() => navigate('/settings')} sx={{ color: 'white' }}>
          <SettingsOutlinedIcon />
        </IconButton>
      </Box>

      {/* Scrollable body */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: '20px', pb: 5 }}>

        {/* Avatar + identity */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 2, pb: 4 }}>
          <Box sx={{ position: 'relative', mb: 2 }}>
            <Avatar
              src={user?.photoURL ?? undefined}
              sx={{
                width: 90,
                height: 90,
                bgcolor: 'rgba(255,255,255,0.2)',
                border: '2px solid rgba(255,255,255,0.4)',
                fontSize: '2.25rem',
                color: 'white',
              }}
            >
              {!user?.photoURL && avatarInitial}
            </Avatar>
            <IconButton
              size="small"
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 28,
                height: 28,
                bgcolor: 'rgba(255,255,255,0.25)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.35)',
                color: 'white',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.4)' },
              }}
            >
              <CameraAltOutlinedIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Box>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
            {displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mt: 0.25 }}>
            Premium Elements Member
          </Typography>
        </Box>

        {/* Email / Password card */}
        <Box sx={glassCard}>
          <TextField
            label="Email Address"
            value={user?.email ?? ''}
            fullWidth
            disabled
            size="small"
            sx={{ ...glassInput, mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            value="placeholder"
            fullWidth
            disabled
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon sx={{ color: 'rgba(255,255,255,0.55)', fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
            sx={glassInput}
          />
          <Button
            startIcon={<AutorenewIcon sx={{ fontSize: 18 }} />}
            onClick={handlePasswordReset}
            disabled={resetSent}
            disableRipple
            sx={{
              mt: 1.5,
              color: resetSent ? 'rgba(255,255,255,0.45)' : 'white',
              textTransform: 'none',
              p: 0,
              fontSize: '0.875rem',
              '&:hover': { bgcolor: 'transparent', opacity: 0.8 },
            }}
          >
            {resetSent ? 'Reset email sent!' : 'Change Password'}
          </Button>
        </Box>

        {/* Account Details card */}
        <Box sx={glassCard}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
            <Typography sx={{ color: 'white', fontWeight: 600, fontSize: '1.1rem' }}>
              Account Details
            </Typography>
            <Button
              onClick={() => setEditMode((v) => !v)}
              sx={{
                bgcolor: 'rgba(255,255,255,0.18)',
                color: 'white',
                borderRadius: '999px',
                px: 2,
                py: 0.4,
                textTransform: 'none',
                fontSize: '0.8rem',
                fontWeight: 500,
                border: '1px solid rgba(255,255,255,0.25)',
                minWidth: 0,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.28)' },
              }}
            >
              {editMode ? 'View Mode' : 'Edit Mode'}
            </Button>
          </Box>

          <Grid container spacing={1.5}>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                disabled={!editMode}
                fullWidth
                size="small"
                placeholder="Enter first name"
                sx={glassInput}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                disabled={!editMode}
                fullWidth
                size="small"
                placeholder="Enter last name"
                sx={glassInput}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                disabled={!editMode}
                fullWidth
                size="small"
                placeholder="City name"
                sx={glassInput}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="State"
                name="state"
                value={form.state}
                onChange={handleChange}
                disabled={!editMode}
                fullWidth
                size="small"
                placeholder="State/Region"
                sx={glassInput}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Latitude"
                name="lat"
                value={form.lat}
                onChange={handleChange}
                disabled={!editMode}
                fullWidth
                size="small"
                placeholder="0.0000"
                sx={glassInput}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Longitude"
                name="lng"
                value={form.lng}
                onChange={handleChange}
                disabled={!editMode}
                fullWidth
                size="small"
                placeholder="0.0000"
                sx={glassInput}
              />
            </Grid>
          </Grid>

          <Button
            fullWidth
            onClick={editMode ? handleSave : undefined}
            disabled={!editMode}
            startIcon={<SaveOutlinedIcon />}
            sx={{
              mt: 2.5,
              bgcolor: editMode ? 'white' : 'rgba(255,255,255,0.2)',
              color: editMode ? '#0061a4' : 'rgba(255,255,255,0.4)',
              borderRadius: '999px',
              py: 1.5,
              fontWeight: 700,
              fontSize: '1rem',
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': { bgcolor: editMode ? 'rgba(255,255,255,0.92)' : undefined, boxShadow: 'none' },
              '&.Mui-disabled': {
                bgcolor: 'rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.35)',
              },
            }}
          >
            Save Changes
          </Button>
        </Box>

        {/* Delete Account card */}
        <Box
          sx={{
            background: 'rgba(255,180,100,0.12)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,160,80,0.25)',
            borderRadius: '16px',
            p: 2.5,
          }}
        >
          <Button
            fullWidth
            onClick={handleDeleteAccount}
            startIcon={<DeleteOutlineOutlinedIcon />}
            disableRipple
            sx={{
              color: '#ffb74d',
              fontWeight: 600,
              fontSize: '1rem',
              textTransform: 'none',
              '&:hover': { bgcolor: 'transparent', opacity: 0.75 },
            }}
          >
            Delete Account
          </Button>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              textAlign: 'center',
              color: 'rgba(255,255,255,0.5)',
              mt: 1,
              lineHeight: 1.5,
            }}
          >
            Deleting your account will permanently remove all saved locations and weather preferences.
          </Typography>
        </Box>

      </Box>
    </Box>
  );
}
