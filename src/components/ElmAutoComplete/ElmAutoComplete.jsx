import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';

const Autocomplete = ({ options, onSelect, placeholder }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

    const handleInputChange = (event) => {
      const newInputValue = event.target.value;
      setInputValue(newInputValue);

      // Filter options based on user input
      const newFilteredOptions = options.filter((option) =>
        option.toLowerCase().startsWith(newInputValue.toLowerCase())
      );
      setFilteredOptions(newFilteredOptions);
      setIsOpen(true); // Open the dropdown on input change
    };

    // Close the dropdown when clicking outside the component
    const handleClickOutside = (event) => {
      if (!event.target.closest('.autocomplete')) {
        setIsOpen(false);
      }
    };

    // document.addEventListener('click', handleClickOutside);

    // return () => document.removeEventListener('click', handleClickOutside);

  const handleOptionClick = (option) => {
    setInputValue(option);
    setFilteredOptions([]);
    setIsOpen(false);
    onSelect(option); // Call the provided function with the selected option
  };

  return (
    <div className="Elm-Autocomplete">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      {isOpen && (
        <ul className="autocomplete-dropdown">
          {filteredOptions.map((option) => (
            <li key={option} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Styles go here...

export default Autocomplete;
