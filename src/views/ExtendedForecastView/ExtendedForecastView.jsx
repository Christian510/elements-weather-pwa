import React from 'react';
import List from '@mui/material/List';
import ElmCard from '../../components/ElmCard/ElmCard';




export default function ExtendedForecastView({ forecast }) {

    const extendedForecast = forecast.periods.map((item, index) => {

        if (index > 0) {
            // console.log('item: ', item.name);
            return (
                <ElmCard
                    key={index}
                    name={item.name}
                    detailedForecast={item.detailedForecast}
                    icon={item.icon}
                    shortForecast={item.shortForecast} />
            );
        }
    } );

    return (
        <List className='extended-forecast'>
            {extendedForecast}
        </List>
    )
}
