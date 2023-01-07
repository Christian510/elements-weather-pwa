import React from 'react';
// import { Form }from 'react-router-dom';
// import Button from '../Button/Button';
function SearchBar(props) {
    return (
        <nav id='searchbar' className='search-bar flex'>
            <form id='' className='' action='' method='POST'>                
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
                <button id='' className='' type='submit' value="submit" onClick={function() { console.log('submitted!!'); }}>Search</button> {/*review code below */}
            </form>
        </nav>
        //     <nav class="navbar navbar-light bg-light d-flex justify-content-center">
        //     <form class="form-inline" action="/weather" method="post">
        //         <input 
        //             class="form-control mr-sm-2" 
        //             type="text"
        //             placeholder="City, State" 
        //             id="city_state"
        //             name="city_state" 
        //             aria-label="Search">
        //         <button id="submit" class="btn btn-outline-success my-2 my-sm-0" type="submit" value="submit" onclick="return isEmpty()">Search</button>
        //     </form>
        // </nav>

    );
}

export default SearchBar;