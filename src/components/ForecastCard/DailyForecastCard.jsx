import { styled } from "@mui/material/styles";
import { CardContent, Typography } from "@mui/material";
import WeatherIcon from "../../components/WeatherIcon/WeatherIcon";

export default function DailyForecastCard({ content, styles, timeCount }) {
  const Content = styled(CardContent)(({ theme }) => ({
    // Add theme object to the styles object
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center",
    padding: ".9em",
    height: "100%",
    color: theme.palette.text.primary,
  }));

  return (
        <>
      {content?.slice(0, timeCount).map((item, index) => {
        return (
          <Content key={index} className="hourly-forecast-card">
            <Typography variant="h6">{item.hour}</Typography>
            <WeatherIcon
              isDay={item.isDaytime}
              iconObj={item.iconObj}
              color="white"
            />
            <Typography variant="h6">{item.temp}&deg;</Typography>
          </Content>
        );
      })}
    </>
  );
}