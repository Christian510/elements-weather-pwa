import React from 'react';
import {
  useLoaderData,
} from 'react-router-dom';
import '../../styles/index.css';
import '../../styles/root.css';
import '../../styles/skeleton.css';
import date from '../../models/date';
import { WeatherDate } from '../../models/date';



export default function WeatherForecast(props) {

        return (
            <>
            <div className='heading'>                
                <h1>Weather Forecast</h1>
            </div>
            </>
        );
}