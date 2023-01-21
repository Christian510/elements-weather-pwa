import React from 'react';
// import { Form }from 'react-router-dom';
// import Button from '../Button/Button';
import '../SearchBar/searchBar.css';
import {
    Form,
    useLoaderData,
    redirect,
  } from "react-router-dom";
//   import { updateContact } from "../contacts";
  
  export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);

    console.log('form data', formData);
    console.log('formatted', updates);
    // await updateContact(params.contactId, updates);
    // return redirect(`/contacts/${params.contactId}`);
  }

function SearchBar(props) {
    return (
        <nav id='searchbar' className='search-bar'>
            <Form id='' className='search-form' action='/weather' method='POST'>                
                <input list="city-search" id="city-search-selection" type="search" name="city-search-selection" placeholder='City, State' />
                <datalist id="city-search">
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