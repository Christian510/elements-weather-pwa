import React, { useState, useEffect } from 'react';
import axios from 'axios';

function useFetchFavorites() {
  const [favorites, setFavorites] = useState({favorites: [], loading: true, error: {isError: false, message: ''}});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/favorites/all');
        setFavorites({ favorites: response.data.locations, loading: false, error: {isError: false, message: ''} });
      } catch (error) {
        console.error('Error fetching data: ', error);
        setFavorites({ favorites: [], loading: false, error: {isError: true, message: `${error}`}});
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount
    // console.log('favorites: ', favorites);
    return favorites;
}

export default useFetchFavorites;