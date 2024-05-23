import React from 'react';
import ElmAutoComplete from '../../components/ElmAutoComplete/ElmAutoComplete';
import WeatherIcon from '../../components/WeatherIcon/WeatherIcon';

export default function DemoView() {
    return (
        <div id='demo' style={{background:"white", height: "100vh"}}>
            <h1>Demo View</h1>
            <ElmAutoComplete />
            <WeatherIcon isday={true} icon="skc" size="sm" color sx={{padding: '2em'}} />
            <WeatherIcon isday={true} icon="skc" size="med" color sx/>
            <WeatherIcon isday={true} icon="skc" size="lrg" color sx/>
        </div>
    );  
}

