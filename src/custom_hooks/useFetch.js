import React, { useState, useEffect } from "react";

// fetches the current weather for a location.
export function useFetchData(url) {
    const [state, setState] = useState({ data: null, loading: true });

    useEffect(() => {
        console.log('mounted!!!')
        setState(state => ({ data: state.data, loading: true }));
        // console.log('state: ', state);
        fetch(url)
            .then(resp => resp.json())
            .then(wd => setState({ data: wd, loading: false }))
            .catch(error => {
                console.log('Error msg: ', error)
            });
        return () => {
            console.log('unmounted!!!')
            setState({ data: null, loading: true });
        }
    }, [url, setState]);

    return state;
};