import React from 'react';
// import { Form }from 'react-router-dom';
// import Button from '../Button/Button';
import '../SearchBar/searchBar.css';
import {
    Form,
    useLoaderData,
    redirect,
  } from "react-router-dom";
// import { fetchCities } from '../../models/weather_data';
// import { getForecastByCity } from '../../models/weather_data';

function SearchBar(props) {
  // const cities = fetchCities() /* this should get moved to app.js and loaded with a loader */
  //   for (let i = 0; i < cities.length; i++) {

  //   }
    return (
        <nav id='searchbar' className='search-bar'>
            <Form id='' className='search-form' action='/weather' method='GET'>                
                <input list="city-search" id="city-search" type="search" name="citySearch" placeholder='City, State, Country' />
                <datalist id="city-search">
                  {/* REPLACE WITH DYNAMIC DATA FROM API */}

                    <option value="Boise, ID" />
                    <option value="Sandpoint, ID" />
                    <option value="Seattle, WA" />
                    <option value="Bozeman, MT" />
                    <option value="Salt Lake City, UT" />
                    <option value="Boulder, CO" />
                    <option value="Denver, CO" />
                </datalist>
                <button id='' className='search-btn' type='submit' value="submit" >Search</button> {/*review code below */}
            </Form>
        </nav>
    );
}

export default SearchBar;