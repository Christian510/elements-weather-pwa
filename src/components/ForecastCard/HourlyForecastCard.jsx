import { styled } from "@mui/material/styles";
import { CardContent, Typography } from "@mui/material";
import WeatherIcon from "../../components/WeatherIcon/WeatherIcon";

// forecast: "Chance Light Rain"
// hour: "Now"
// iconObj: {id: 19, icon: 'rain', description: 'Rain', weather_icon_day: 'wi-day-rain', weather_icon_night: 'wi-night-alt-rain'}
// isDaytime: true
// key: 1
// temp: 48
// tempUnit: "F"
// title: ""

export default function HourlyForecastCard({ content, styles, timeCount, gap }) {
  // console.log('content: ', content);
  const Content = styled(CardContent)(({ theme }) => ({
    // Add theme object to the styles object
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center",
    // padding: "0 .9em 0 .9em",
    height: "100%",
    color: theme.palette.text.primary,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: 6,
  }));
  
  return (
    <>
      {content?.slice(0, timeCount).map((item, index) => {
        return (
          <Content key={index} className="hourly-forecast-card">
            <Typography sx={elmStyles.layout} variant="body2">{item.time}</Typography>
            <WeatherIcon
              sx={elmStyles.layout}
              isDay={item.isDaytime}
              iconObj={item.iconObj}
              color="white"
              size="med"
            />
            <Typography sx={elmStyles.layout} variant="body2">
              {item.temp}&deg;{" "}{item.tempUnit}
            </Typography>
            {/* <Typography variant="h6">{item.temp}&deg;</Typography> */}
          </Content>
        );
      })}
    </>
  );
}

const elmStyles = {
  layout: {
    paddingBottom: "1em"
  }
};
