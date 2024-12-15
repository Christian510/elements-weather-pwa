import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import { styled } from '@mui/material/styles';
import { debounce } from '@mui/material/utils';
import { queryLocations } from '../../models/geo_location_api';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchInput() {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  
  const fetchLocations = useMemo(() => {
    let isMounted = true;
    if (!isMounted) return;
    else if (isMounted) {
      return debounce(async () => {
        const response = await queryLocations(inputValue);
        if (response?.geonames === undefined) {
          return;
        } else {
          let results = response.geonames.map((item, index) => {
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
      isMounted = false;
      setOptions([]);
      setInputValue('');
      setValue(null);
    };

  }, [inputValue]);

  useEffect(() => {
    if (inputValue.length > 2) {
      fetchLocations();

    }
    if (inputValue.length < 1) {
      setOptions([])
    }

    return () => {
      setOptions([]);
    }

  }, [inputValue, fetchLocations]);
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
  } = useAutocomplete({
    clearIcon: <SearchIcon fontSize='small' />,
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
  return (
    <>
    <SearchInputWrapper id="search-input" >
        <StyledInputRoot {...getRootProps()} className={focused ? 'focused' : ''}>
          <StyledInput {...getInputProps()} />
        </StyledInputRoot>
    </SearchInputWrapper>
        {groupedOptions.length > 0 && (
          <StyledListbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <Link id={`option_${option.location_id}`} key={option.location_id} style={{textDecoration: 'none'}} to={`forecast/${JSON.stringify(option)}`} >
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

const SearchInputWrapper = styled('div')(({ theme }) => ({
  width: 'inherit',
  minWidth: '300',

}))
const StyledInputRoot = styled('div')(
  ({ theme }) => `
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50]};
  background: ${theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[500]};
  border: 1px solid ${theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200]};
  box-shadow: 0px 1px 1px ${theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[500]};
  display: flex;
  padding-right: 5px;
  overflow: hidden;
  width: 100%;

  &.focused {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 1px ${theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[500]};
  }

  &:hover {
    border-color: ${theme.palette.grey[400]};
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
  color: ${theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[50]};
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
  padding: 8px 8px;
  overflow-y: auto;
  scrollbar-width: none;
  opacity: unset;
  outline: 0px;
  min-height: 100vh;
  z-index: 1;
  position: absolute;
  top: 92px;
  left: 0;
  right: 0;
  background: ${theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.grey[200]};
  `,
);

const StyledOption = styled('li')(
  ({ theme }) => `
  color: ${theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.grey[900]};
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
    background-color: ${theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100]};
    color: ${theme.palette.mode === 'dark' ? theme.palette.grey[50] : theme.palette.grey[900]};
  }

  &.Mui-focused,
  &.Mui-focusVisible {
    background-color: ${theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100]};
    color: ${theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[900]};
  }

  &.Mui-focusVisible {
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[200]};
  }

  &[aria-selected=true].Mui-focused,
  &[aria-selected=true].Mui-focusVisible {
    background-color: ${theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50]};
    color: ${theme.palette.mode === 'dark' ? theme.palette.grey[50] : theme.palette.grey[900]};
  }
  `,
);