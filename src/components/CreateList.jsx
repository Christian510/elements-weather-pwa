import ForecastCard from "../components/ForecastCard/ForecastCard";
import WeatherIcon from "./WeatherIcon/WeatherIcon";
import { parseUrl, formatDateTime } from '../utils/utl_functions';

function dateTime(dt, type) {
    let date;
    if (type === 'hourly') {
      date = dt.time;
    }
    if (type === 'daily') {
      let split = dt.date.split(',');
      date = split[0];
    }
    return date;
}
const CreateList = ({data, type, direction='row', count}) => {
    let current;
    if (type === 'hourly') {
      current = "Now"
    }
    else if (type === 'daily') {
      current = "Today"
    }
    const forecast = data.forecast.map((item, index) => (
      {
          key: item.number,
          title: data.location.name,
          icon: parseUrl(item.icon),
          forecast: item.shortForecast,
          temp: item.temperature,
          tempUnit: item.temperatureUnit,
          isDaytime: item.isDaytime,
          hour: index === 0 ? current : dateTime(formatDateTime(item.startTime, {hh: 'numeric'}), type),
      }
  ));
// console.log('forecast: ', forecast);
    return (
        <>
        {forecast.map((item, index) => {
            while ( index <= count) {
                return <ForecastCard
                    key={index}
                    content={{
                        forecast: item.forecast,
                        temp: { temp: item.temp, tempUnit: item.tempUnit },
                        isDaytime: item.isDaytime,
                        hour: item.hour
                    }}
                    flexDirection={direction}
                    // justifyContent={justifyContent}
                    // alignItems={alignItems}
                    Icon={() => <WeatherIcon isDay={item.isDaytime} icon={item.icon} size="med" />}
                    />
            }
        })}
        </>
);
};

export default CreateList