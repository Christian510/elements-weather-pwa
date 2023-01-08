import React from 'react';
// import { Form }from 'react-router-dom';
// import Button from '../Button/Button';
import '../SearchBar/searchBar.css';
function SearchBar(props) {
    return (
        <nav id='searchbar' className='search-bar'>
            <form id='' className='search-form' action='' method='POST'>                
                <input list="city-search" id="city-search-selection" type="search" name="city-search-selection" placeholder='City, State' />
                <datalist id="city-search">
                    <option value="Boise" />
                    <option value="Sandpoint" />
                    <option value="Seattle" />
                    <option value="Bozeman" />
                    <option value="Salt Lake City" />
                    <option value="Boulder" />
                    <option value="Denver" />
                </datalist>
                <button id='' className='search-btn' type='submit' value="submit" onClick={function() { console.log('submitted!!'); }}>Search</button> {/*review code below */}
            </form>
        </nav>
    );
}

export default SearchBar;