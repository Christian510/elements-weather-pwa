import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
// import Autocomplete from '@mui/material/Autocomplete';

function ElmAutocomplete({ options, onSelect }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClearInput = () => {
    setInputValue('');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <IconButton aria-label="search">
        <SearchIcon />
      </IconButton>
      <TextField
        style={{ width: '100%', backgroundColor: 'white' }}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search"
        fullWidth
        InputProps={{
          endAdornment: (
            <IconButton aria-label="clear" onClick={handleClearInput}>
              <ClearIcon />
            </IconButton>
          ),
        }}
      />
    </div>
  );
}

export default ElmAutocomplete;
