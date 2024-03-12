import React, { useState, useEffect } from 'react';
import axios from 'axios';

function useFetchFavorites() {
  const [data, setFavorites] = useState({data: [], loading: true, error: {isError: false, message: ''}});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/favorites/all');
        // console.log('resp data: ', response.data);
        setFavorites({ data: response.data.locations, loading: false, error: {isError: false, message: ''} });
      } catch (error) {
        console.error('Error fetching data: ', error);
        setFavorites({ data: [], loading: false, error: {isError: true, message: `${error}`}});
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount
    // console.log('favorites: ', favorites);
    return data;
}

export default useFetchFavorites;