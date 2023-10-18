import React from 'react';
import ControlledStates from '../../components/MuiSearchBar/SearchWeatherByLocation';

function DemoView() {
    return (
        <div id='demo'style={container}>
            <ControlledStates />
        </div>
    );

    
}

const container = {
    minWidth: '100%',
    minHeight: '5rm',
};

export default DemoView;
