import { forwardRef, useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { queryLocations } from '../../models/geo_location_api';
import { debounce } from '@mui/material/utils';
import { useLocation } from 'react-router-dom';

// check if the location found matches any of the favorites if so,
// flag that it matches a favorite if look up the forecast for that location
// Send as props to the current conditions view;
const ElmSearch = forwardRef(function ElmAutocomplete(props, ref) {

  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const location = useLocation();
  
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

  useEffect(() => {
    return () => {
      setOptions([]);
      setInputValue('');
      setValue(null);
    };
  }, [location]);

  const {
    disableClearable = false,
    disabled = false,
    readOnly = false,
    ...other
  } = props;

  const {
    getRootProps,
    getInputProps,
    // getPopupIndicatorProps,
    getClearProps,
    getListboxProps,
    getOptionProps,
    // dirty,
    id,
    // popupOpen,
    focused,
    anchorEl,
    setAnchorEl,
    groupedOptions,
    
  } = useAutocomplete({
    id: 'elm-autocomplete',
    componentName: 'ElmSearch',
    getOptionLabel: (option) => option.name,
    options: options,
    value: value,
    onInputChange: (event, newValue) => {setInputValue(newValue);},
    onChange: (event, newValue) => {setValue(newValue);},
    ...props,
  });

  const hasClearIcon = !disableClearable && !disabled && !readOnly;
  const rootRef = useForkRef(ref, setAnchorEl);

  return (
    <>
      <StyledFlexWrapper>
        <StyledAutocompleteRoot
          id='elm-autocomplete-root'
          {...getRootProps(other)}
          ref={rootRef}
          className={focused ? 'focused' : undefined}
        >
          <ElmSearchIcon 
            fontSize='small'/>
          <StyledInput
            id={id}
            ref={rootRef}
            disabled={disabled}
            readOnly={readOnly}
            {...getInputProps()}
          />
          {inputValue.length > 0 && hasClearIcon && (
            <StyledClearIndicator
            variant='text'
            {...getClearProps()}>
              <ClearIcon fontSize="small" />
            </StyledClearIndicator>
          )}
            {/* {inputValue.length < 2 && !hasClearIcon && (
          <StyledPopupIndicator
            {...getPopupIndicatorProps()}
            className={popupOpen ? 'popupOpen' : undefined}
            >
            <ArrowDropDownIcon />
          </StyledPopupIndicator>
            )} */}
          </StyledAutocompleteRoot>
          {focused === true && (
            <StyledButton
              disableRipple
              variant="text"
              type="button"
              onClick={() => console.log('clear')}
              >cancel</StyledButton>
          )}
        </StyledFlexWrapper>
      {focused === true && anchorEl ? (
          <StyledListbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <StyledLink id={`option_${option.location_id}`} 
                key={option.location_id} 
                to={`forecast/${JSON.stringify(option)}`} >
                <StyledOption {...getOptionProps({ option, index })}>
                  {`${option.name}, ${option.state}`}
                </StyledOption>
              </StyledLink>
              ))}
            {groupedOptions.length === 0 && focused === true && (
              <StyledNoOptions>No results</StyledNoOptions>
            )}
          </StyledListbox>
      ) : null}
    </>
  );
});

ElmSearch.propTypes = {
  /**
   * If `true`, the input can't be cleared.
   * @default false
   */
  disableClearable: PropTypes.oneOf([false]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the component becomes readonly. It is also supported for multiple tags where the tag cannot be deleted.
   * @default false
   */
  readOnly: PropTypes.bool,
};

export default ElmSearch;

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  900: '#003A75',
};

const StyledFlexWrapper = styled('div')(({ theme }) => 
  `
  width: inherit;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  `);

const StyledLink = styled(Link)(({ theme }) => 
  `
  text-decoration: none;
  color: inherit;
  `);

const ElmSearchIcon = styled(SearchIcon)(({ theme }) => 
  `
  color: ${theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[500]};
  position: absolute;
  left: 2%;
  bottom: 20%;
`);
const StyledAutocompleteRoot = styled('div')(({ theme }) => 
  `
  position: relative;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[500]};
  background: ${theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[300]};
  display: flex;
  gap: 5px;
  padding-right: 5px;
  padding-left: 20px;
  overflow: hidden;
  width: 100%;
  max-width: 420px;
  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? theme.palette.grey[400] : theme.palette.grey[500]};
    box-shadow: 0 0 0 1px ${theme.palette.mode === 'dark' ? theme.palette.grey[400] : theme.palette.grey[500]};
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
  color: ${theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
  flex: 1 0 auto;
`,
);

const StyledButton = styled(Button)(
  ({ theme }) => `
    color: ${theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[500]};
    justify-content: space-between;

  `,
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-size: 1.175rem;
  font-weight: 400;
  box-sizing: border-box;
  padding: 8px 8px;
  min-width: 100%;
  overflow: auto;
  outline: 0;
  min-height: 100vh;
  z-index: 1;
  background: ${theme.palette.mode === 'dark' ? theme.palette.background.default : '#fff'};
  color: ${theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.grey[900]};
  scrollbar-width: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  &::-webkit-scrollbar {
    display: none;
  }
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
  &[aria-selected="true"] {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }
  &.Mui-focused,
  &.Mui-focusVisible {
    background-color: ${theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100]};
    color: ${theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[900]};
  }
  &.Mui-focusVisible {
    box-shadow: 0 0 0 1px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }
  &[aria-selected="true"].Mui-focused,
  &[aria-selected="true"].Mui-focusVisible {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }
  `,
);

// const StyledPopupIndicator = styled(Button)(
//   ({ theme }) => `
//     outline: 0;
//     box-shadow: none;
//     border: 0;
//     border-radius: 4px;
//     background-color: transparent;
//     align-self: center;
//     padding: 0 2px;
//     color: ${theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[800]};
//     &:hover {
//       background-color: ${theme.palette.mode === 'dark' ? theme.palette.grey[700] : blue[100]};
//       cursor: pointer;
//     }
//     & > svg {
//       transform: translateY(2px);
//     }
//     &.popupOpen > svg {
//       transform: translateY(2px) rotate(180deg);
//     }
//   `,
// );

const StyledClearIndicator = styled(Button)(
  ({ theme }) => `
    outline: 0;
    box-shadow: none;
    border: 0;
    border-radius: 4px;
    background-color: transparent;
    align-self: center;
    padding: 0 2px;
    min-width: 0;
    color: ${theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[800]};
    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[100]};
      cursor: pointer;
    }
    & > svg {
      transform: translateY(2px) scale(0.9);
    }
  `,
);

const StyledNoOptions = styled('li')`
  list-style: none;
  padding: 8px;
  cursor: default;
`;