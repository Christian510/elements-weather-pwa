import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import { styled } from '@mui/system';
import { debounce } from '@mui/material/utils';
import { queryLocations } from '../../models/geo_location_api';

export default function SearchInput() {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  
  const fetchLocations = useMemo(() => {
    let isMounted = true;
    if (!isMounted) return; // Check if component is still mounted before updating state
    else if (isMounted) {
      return debounce(async () => {
        const response = await queryLocations(inputValue);
        // console.log('response: ', response.geonames);
        if (response?.geonames === undefined) {
          return;
        } else {
          let results = response.geonames.map((item, index) => {
            // console.log('item: ', item);
            return {
              "name": item.toponymName,
              "state": item.adminCode1,
              "country_code": item.countryCode,
              "lat": item.lat,
              "lng": item.lng,
              "location_id": item.geonameId,
            }

          });
          setOptions(results);
        }
  
      }, 100);
    }

    return () => {
      // Cleanup function
      isMounted = false; // Update flag to indicate component is unmounted
    };

  }, [inputValue]);

  useEffect(() => {
    console.log('useEffect fired')
    if (inputValue.length > 2) {
      fetchLocations();

    }
    if (inputValue.length < 1) {
      // console.log('length: ', inputValue.length)
      setOptions([])
    }

  }, [inputValue]);

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
    isOptionEqualToValue: (option, value) => option.id === value.id,
    onChange: (event, newValue) => { setValue(newValue) },
    inputValue,
    onInputChange: (event, newValue) => { setInputValue(newValue); },
  }, [options, inputValue, value]);
  // console.log('getInputProps: ', getInputProps());
  return (
    <>
    <div id="search-input" style={styles}>
        <StyledInputRoot {...getRootProps()} className={focused ? 'focused' : ''}>
          <StyledInput {...getInputProps()} />
        </StyledInputRoot>
    </div>
        {groupedOptions.length > 0 && (
          <StyledListbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <Link style={{textDecoration: 'none'}} to={`forecast/${JSON.stringify(option)}`} >
                <StyledOption {...getOptionProps({ option, index })}>
                  {`${option.name}, ${option.state}`}
                </StyledOption>
              </Link>
            ))}
          </StyledListbox>
        )}
    </>
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
  50: '#f7f7f7',
  100: '#eeeeee',
  200: '#e1e1e1',
  300: '#cfcfcf',
  400: '#aaaaaa',
  500: '#898989',
  600: '#626262',
  700: '#4f4f4f',
  800: '#313131',
  900: '#111111',
};

const styles = {
  width: '100%',
  minWidth: '300px',
  margin: '.5rem 0',
}

const StyledInputRoot = styled('div')(
  ({ theme }) => `
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : grey[500]};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 1px 1px ${theme.palette.mode === 'dark' ? grey[900] : grey[500]};
  display: flex;
  padding-right: 5px;
  overflow: hidden;
  width: 100%;

  &.focused {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 1px ${theme.palette.mode === 'dark' ? grey[900] : grey[500]};
  }

  &:hover {
    border-color: ${grey[400]};
  }

  &:focus-visible {
    outline: 0;
  }
`,
);

const StyledInput = styled('input')(
  ({ theme }) => `
  width: 100%;
  font-size: 1.175rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[50]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 3px 12px;
  outline: 0;
  flex: 1 0 auto;
`,
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size:  1.175rem;
  font-weight: 400;
  box-sizing: border-box;
  text-wrap: nowrap;
  padding: 0px 8px;
  height: fit-content;
  overflow: auto;
  outline: 0px;
  min-height: 190vw;
  z-index: 1;
  position: absolute;
  top: 120px;
  left: 0;
  right: 0;
  background: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  `,
);

const StyledOption = styled('li')(
  ({ theme }) => `
  color: ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  list-style: none;
  text-decoration: none;
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
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  }

  &.Mui-focused,
  &.Mui-focusVisible {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.Mui-focusVisible {
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? grey[500] : grey[200]};
  }

  &[aria-selected=true].Mui-focused,
  &[aria-selected=true].Mui-focusVisible {
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  }
  `,
);

const Layout = styled('div')`

`;

// const Pre = styled('pre')(({ theme }) => ({
//   margin: '0.5rem 0',
//   '& code': {
//     backgroundColor: theme.palette.mode === 'light' ? '#ebebef' : '#25252d',
//     color: theme.palette.mode === 'light' ? '#000' : '#fff',
//     padding: '0.125rem 0.25rem',
//     borderRadius: 3,
//   },
// }));