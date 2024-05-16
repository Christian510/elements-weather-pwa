
import List from '@mui/material/List';
import ListCard from '../../components/ListCard/ListCard';




export default function ExtendedForecastView({ forecast }) {
    console.log('forecast: ', forecast);
    const extendedForecast = forecast.periods.map((item, index) => {
            return (
                <ListCard />
            );
    } );

    return (
        <List className='extended-forecast'>
            {extendedForecast}
        </List>
    )
}
