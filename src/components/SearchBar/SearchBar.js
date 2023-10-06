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
import { GeoLocation } from '../../models/city_data';

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

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  // backgroundColor: theme.palette.action,
}));

const StyledTextField = styled(TextField)(({theme}) =>({
  color: 'inherit',
  '& .MuiInputBase-root': {
    '&::before': {
      borderBottom: 'none',
    },
  '& .MuiInput-input': {
    padding: '4px 4px 4px 12px',
  }
  },
  '& .MuiInput-root' : {
    marginTop: 'revert',
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
    const cities = [];

  // const navigate = useNavigate();
  const [value, setValue] = useState('');
  const inputRef = useRef();
  console.log('value: ', value);
  // const handleSelection = (e) => {
  //     setValue(e.target.value);
  // }

  const handleSearchInput = (e) => {
    console.log('e: ', e.target.value);
    // (event, newValue) => {
    //   console.log('newValue: ', newValue);
    //   event.preventDefault();
    //   setValue(newValue);
  }

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
          {/* <Search> */}
            {/* <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper> */}
            <StyledAutocomplete
              filterOptions={(x) => x}
              freeSolo
              value={value}
              // onChange={(event, newValue) => {
              //     console.log('newValue: ', newValue);
              //     event.preventDefault();
              //     setValue(newValue);
              // }}
              onChange = {handleSearchInput}
          
              id="city-search"
              options={cities}
              //   getOptionLabel={(option) => `${option}`}
              sx={{ width: 300 }}
              renderInput={(params) => (
                console.log('params: ', params.inputProps.value),
                <StyledTextField
                {...params}
                  datatype='TextField'
                  name="citySearch"
                  label="Search for a city"
                  variant="standard"
                  inputRef={inputRef}
                  type='search'
                  />
              )}
            />
          {/* </Search> */}
          <RtDrawer />
        </Toolbar>
      </AppBar>
    </Box>
  );
}