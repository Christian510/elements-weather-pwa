import React, { useState, useEffect } from "react";

export function useFetch(url) {
    // fetches the current weather for a location.
    // returns weather data to render to the ui.

    const [state, setState] = useState({data: null, loading: true});
    
    useEffect(() => {
        setState( state => ({data: state.data, loading: true}));
        console.log('state: ', state);
        fetch(url)
        .then(resp => resp.json() )
        .then(wd => setState({data: wd, loading: false}))
        .catch( error => {
            console.log('Error msg: ', error)
        })
    }, [url, setState]);
    return state;
};