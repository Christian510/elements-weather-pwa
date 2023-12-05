import React, { useState, useEffect, useRef } from "react";

// fetches the current weather for a location.
export function useFetchData(url) {
    console.log('url: ', url)
    const [state, setState] = useState({ data: null, loading: true });
    const [urlState, setUrlState] = useState(url);
    const prevUrlRef = useRef(url);

    // console.log('prevUrlRef: ', prevUrlRef);
    
    // const fetchData = async (url) => {
    //     return await fetch(url)
    //         .then(resp => resp.json())
    //         .then(wd => wd)
    //         .catch(error => {
    //             console.log('Error msg: ', error)
    //         });
    // }

    useEffect(() => {
        // console.log('mounted!!!')
        prevUrlRef.current = url;
        setUrlState(url);
        console.log('previous: ', prevUrlRef.current);
        console.log('current: ', urlState);

        setState(state => ({ data: state.data, loading: true }));
        // console.log('state: ', state);
        // if (url !== urlState) {
        //     setUrlState(url);
        //     console.log('urlState: ', urlState);
        // }
        if (url !== null) {
            fetch(url)
                .then(resp => resp.json())
                .then(wd => setState({ data: wd, loading: false }))
                .catch(error => {
                    console.log('Error msg: ', error)
                });
        }
        // return () => {
        //     // console.log('unmounted!!!')
        //     setState({ data: null, loading: true });
        // }
    }, [url]);
    // console.log('state: ', state);
    return state;
};