import React, { useState, useRef } from 'react';
import { TextField, Button } from '@mui/material';
// import Button from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useHistory, Form } from 'react-router-dom';

function CitySearch() {
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
    <Form id='' className='search-form' action='/weather' method='GET'> 
        <Autocomplete
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
        {/* <Button type="submit" variant="contained" sx={{ ml: 2 }}>Search</Button> */}
    </Form>
  );
}

export default CitySearch;