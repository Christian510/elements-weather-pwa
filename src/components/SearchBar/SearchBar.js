// import * as React from 'react';
import React, { useState, useRef } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import InputBase from '@mui/material/InputBase';
import Autocomplete from '@mui/material/Autocomplete';
import RtDrawer from '../MuiDrawer/MuiDrawer';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  // color: 'inherit',
  // '& .MuiInputBase-input': {
  //   padding: theme.spacing(1, 1, 1, 0),
  //   // vertical padding + font size from searchIcon
  //   paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  //   transition: theme.transitions.create('width'),
  //   width: '100%',
  //   [theme.breakpoints.up('sm')]: {
  //     width: '12ch',
  //     '&:focus': {
  //       width: '20ch',
  //     },
  //   },
  // },
}));

export default function SearchAppBar() {
    const cities = [
      'Boise, ID',
      'Sandpoint, ID',
      'Portland, OR',
      'Hailey, ID',
      'Bozeman, MT',
      'Salt Lake City, UT',
      'Seattle, WA',
      'Denver, CO',
  ];

  // const navigate = useNavigate();
  const [value, setValue] = useState('');
  const inputRef = useRef();
  // console.log('value: ', value);
  // const handleSelection = (e) => {
  //     setValue(e.target.value);
  // }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            ELM
          </Typography>
          <Search>
            {/* <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper> */}
            <StyledAutocomplete
              value={value}
              onChange={(event, newValue) => {
                  event.preventDefault();
                  setValue(newValue);
              }}
          
              id="city-search"
              options={cities}
              //   getOptionLabel={(option) => `${option}`}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                {...params}
                  name="citySearch"
                  label="Search for a city"
                  variant="outlined"
                  inputRef={inputRef}
                  //   onSelect={handleSelection}
                  />
              )}
            />
          </Search>
          <RtDrawer />
        </Toolbar>
      </AppBar>
    </Box>
  );
}