import React from "react";
import '../AboutAppView/aboutappview.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useMemo } from "react";



function AboutView(props) {

    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    console.log('inputValue set: ', inputValue)
    const [options, setOptions] = useState([]);
    const loaded = useRef(false);

    const fetch = useMemo( 
        () =>
            debounce((request, callback) => {
                console.log('request: ', request);
                console.log('callback: ', callback);
                // Fetch a list of cities and locations based on inputValue and then setOptions.
                // Star tetch when inputValue has at least 3 characters.
            }, 400),
        [],
    );

    useEffect(() => {
        let active = true;

        // if (!autocompleteService.current && window.google) {
        //   autocompleteService.current =
        //     new window.google.maps.places.AutocompleteService();
        // }
        // if (!autocompleteService.current) {
        //   return undefined;
        // }

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({ input: inputValue }, (results) => {
            if (active) {
                console.log("active", active)
                let newOptions = [];

                if (value) {
                    console.log("value", value)
                    newOptions = [value];
                }

                if (results) {
                    console.log("results", results)
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    return (
        <>
            <div id="about-page" className="container">
                <h2>Welcome Elements Weather</h2>
                <h3>A person project to create a weather app I like using.</h3>
            </div>
            <Autocomplete
                id="get-search-results"
                sx={{ width: 300 }}
                getOptionLabel={(option) =>
                    typeof option === 'string' ? option : option.description
                }
                filterOptions={(x) => x}
                options={options}
                autoComplete
                includeInputInList
                filterSelectedOptions
                value={value}
                noOptionsText="No locations"
                onChange={(event, newValue) => {
                    console.log('newValue: ', newValue);
                    setOptions(newValue ? [newValue, ...options] : options);
                    setValue(newValue);
                }}
                onInputChange={(event, newInputValue) => {
                    console.log('newInputValue: ', newInputValue)
                    setInputValue(newInputValue);
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Weather Search" fullWidth />
                )}
                renderOption={(props, option) => {
                    console.log('option: ', option);
                    console.log('props: ', props);
                    const matches =
                        option.structured_formatting.main_text_matched_substrings || [];

                    const parts = parse(
                        option.structured_formatting.main_text,
                        matches.map((match) => [match.offset, match.offset + match.length]),
                    );

                    return (
                        <li {...props}>
                            <Grid container alignItems="center">
                                <Grid item sx={{ display: 'flex', width: 44 }}>
                                    <LocationOnIcon sx={{ color: 'text.secondary' }} />
                                </Grid>
                                <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                                    {parts.map((part, index) => (
                                        <Box
                                            key={index}
                                            component="span"
                                            sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                                        >
                                            {part.text}
                                        </Box>
                                    ))}
                                    <Typography variant="body2" color="text.secondary">
                                        {option.structured_formatting.secondary_text}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </li>
                    );
                }}
            />
        </>
    );
}

export default AboutView;