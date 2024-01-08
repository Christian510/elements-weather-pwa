import React, { useState, useEffect, useRef } from "react";

// fetches the current weather for a location.
export function useFetchData(url) {
    // console.log('url: ', url)
    const [state, setState] = useState({ data: null, loading: true, isError: false, error: {isError: false, message: ''} });
    const [urlState, setUrlState] = useState(url);
    const prevUrlRef = useRef(url);

    // console.log('prevUrlRef: ', prevUrlRef);

    useEffect(() => {
        // console.log('mounted!!!')
        prevUrlRef.current = url;
        setUrlState(url);
        // console.log('previous: ', prevUrlRef.current);
        // console.log('current: ', urlState);

        setState(state => ({ data: state.data, loading: true, error: {isError: false, message: ''} }));
        // console.log('state: ', state);
        // if (url !== urlState) {
        //     setUrlState(url);
        //     console.log('urlState: ', urlState);
        // }
        if (url !== null) {
            const options = {
                'method': 'GET',
                'mode': 'cors',
                'headers' : {
                // 'Access-Control-Allow-Origin': '*',
                // 'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
            fetch(url, options)
                .then(resp => {
                    // console.log('resp: ', resp);
                    if (resp.ok !== true && resp.body == null) {
                        console.log('status:', resp.status)
                        console.log('body:', resp.body);
                        setState({ data: null, loading: false, error: {isError: true, message: 'Server Error'} });
                        // throw new Error('Unable to get forecast data');
                    } if (resp.ok) {
                        // console.log('resp.ok: ', resp.ok);
                        // console.log('resp.json(): ', resp.json());
                        return resp.json();

                    }
                })
                .then(wd => {
                    // console.log('wd: ', wd);
                    setState({ data: wd, loading: false, error: {isError: false, message: ''} })})
                .catch(error =>
                    console.log('Error msg: ', error)
                );
        }
        // return () => {
        //     // console.log('unmounted!!!')
        //     setState({ data: null, loading: true });
        // }
    }, [url]);
    return state;
};