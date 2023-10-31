import React from 'react';
import { Link, redirect } from 'react-router-dom';
import { useMemo, useState, useEffect} from 'react';
// import { usePrevious } from '../../custom_hooks/customHooks';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import { styled } from '@mui/system';
import { debounce } from '@mui/material/utils';
import { queryLocations } from '../../models/city_api';

export default function SearchInput({ functions }) {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  // const updateOptions = usePrevious(options);
  console.log('value: ', value);
  // console.log('inputValue: ', inputValue);
  // console.log('options: ', options);
  // console.log('updateOptions: ', updateOptions);
  // console.log('is equal: ', options === updateOptions);
  
  // const getForecast = functions.getForecast;

  // NEED TO WORK ON A WAY TO FILTER OPTIONS LIST AS THE USER TYPES TO CONTINUE NARROWING THE OPTIONS

  const fetchLocations = useMemo(() => {
    return debounce(async () => {
      const response = await queryLocations(inputValue);
      console.log('response: ', response.geonames);

      if (response?.geonames === undefined) {
        return;
      } else {
        let results = response.geonames.map((item, index) => {
          return {
            'name': `${item.toponymName}, ${item.adminCode1}`,
            'coords':
            {
              'lat': item.lat,
              'lng': item.lng
            },
            'id': item.geonameId,
          }

        });
        setOptions(results);
      }

    }, 400);
  });

  useEffect(() => {
    if (inputValue.length > 2) {
      fetchLocations();
    }

  }, [inputValue, options.length]);

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
  } = useAutocomplete({
    getOptionLabel: (option) => option.name,
    freeSolo: true,
    filterOptions: (x) => x,
    filterSelectedOptions: true,
    id: 'weather-search',
    autoComplete: true,
    options: options,
    value: value,
    defaultValue: 'Type your search here...',
    isOptionEqualToValu: (option, value) => option.id === value.id,
    onChange: (event, newValue) => { setValue(newValue) },
    inputValue,
    onInputChange: (event, newValue) => { setInputValue(newValue); },
  }, [options, inputValue, value]);

  return (
    <Layout>
      <StyledAutocomplete>
        <StyledInputRoot {...getRootProps()} className={focused ? 'focused' : ''}>
          <StyledInput {...getInputProps()} />
        </StyledInputRoot>
        {groupedOptions.length > 0 && (
          <StyledListbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
            <Link 
            to={`/weather-forecast/${JSON.stringify(option)}`}
            onKeyUp={ (e) => console.log(e.target.value)} // Not sure how to do this quite yet.
            >
              <StyledOption {...getOptionProps({ option, index })}>
                {option.name}
              </StyledOption>
            </Link>
            ))}
          </StyledListbox>
        )}
      </StyledAutocomplete>
    </Layout>
  );
}

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledAutocomplete = styled('div')`
  position: relative;
  margin: 1.5rem 0;
`;

const StyledInputRoot = styled('div')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  display: flex;
  gap: 5px;
  padding-right: 5px;
  overflow: hidden;
  width: 320px;

  &.focused {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus-visible {
    outline: 0;
  }
`,
);

const StyledInput = styled('input')(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
  flex: 1 0 auto;
`,
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  max-width: 100%;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  max-height: 300px;
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);

const StyledOption = styled('li')(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    cursor: pointer;
  }

  &[aria-selected=true] {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.Mui-focused,
  &.Mui-focusVisible {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.Mui-focusVisible {
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  &[aria-selected=true].Mui-focused,
  &[aria-selected=true].Mui-focusVisible {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }
  `,
);

const Layout = styled('div')`
  display: flex;
  flex-flow: column nowrap;
`;

const Pre = styled('pre')(({ theme }) => ({
  margin: '0.5rem 0',
  '& code': {
    backgroundColor: theme.palette.mode === 'light' ? '#ebebef' : '#25252d',
    color: theme.palette.mode === 'light' ? '#000' : '#fff',
    padding: '0.125rem 0.25rem',
    borderRadius: 3,
  },
}));