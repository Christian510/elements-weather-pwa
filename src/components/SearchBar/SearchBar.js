import React from 'react';
import { useState, useRef, useEffect } from 'react';
// import { Form }from 'react-router-dom';
// import Button from '../Button/Button';
import '../SearchBar/searchBar.css';
import {
    Form,
    useLoaderData,
    redirect,
  } from "react-router-dom";
import { GeoLocation } from '../../models/city_data';
import { usePrevious } from '../../custom_hooks/customHooks';



function SearchBar(props) {

  // const [backStop, setBackStop] = useState([{backStop: ''}])
  const [query, setQuery] = useState([{query: ''}]);
  console.log(query)
  
  // const input = (input) => input;
  // setQuery(input);
  const prevCount = usePrevious(query);

    if(query > prevCount) {
      console.log('prevCount checked.')
        debounce(query);
    }

  function debounce(keys) {
    if (keys.length > 5) {
      console.log('debounce triggered.')
      const search = new GeoLocation(query);
      // return search.cities.then(data => data); 
      search.cities.then(data => console.log('data: ',data)); 
    }
  }
  
  // console.log("query: ", query)

    return (
        <nav id='searchbar' className='search-bar'>
            <Form id='' className='search-form' action='/weather' method='GET'>                
                <input list="city-search" 
                id="city-search" 
                type="search" 
                name="citySearch" 
                placeholder='City, State, Country' 
                onChange={(e) => setQuery(e.target.value)} />
                <datalist id="city-search">
                  {/* REPLACE WITH DYNAMIC DATA FROM API */}
                    {/* <option value="Boise, ID" />
                    <option value="Sandpoint, ID" />
                    <option value="Seattle, WA" />
                    <option value="Bozeman, MT" />
                    <option value="Salt Lake City, UT" />
                    <option value="Boulder, CO" />
                    <option value="Denver, CO" /> */}
                </datalist>
                <button id='' className='search-btn' type='submit' value="submit" >Search</button> {/*review code below */}
            </Form>
        </nav>
    );
}

export default SearchBar;