import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Collapse,
  Grid,
  Divider,
  useTheme,
} from "@mui/material";
import {
  WbSunny,
  Cloud,
  CloudQueue,
  Grain,
  Air,
  Opacity,
  Visibility,
  Speed,
  ExpandMore,
  AccessTime,
  CalendarToday,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import WeatherIcon from "../../components/WeatherIcon/WeatherIcon";

export default function DailyForecastCard({ content, styles, timeCount }) {
  const [expandedDay, setExpandedDay] = useState(null);
  const theme = useTheme();
  const dailyData = [
    {
      day: "Today",
      date: "Jan 28",
      high: 38,
      low: 35,
      condition: "partlyCloudy",
      summary:
        "Mostly sunny with temperatures near 38°F. West southwest wind around 8 mph. Clear skies expected throughout most of the day.",
      wind: "25 mph SW",
      humidity: "25%",
      precipitation: "10%",
      uv: "Low",
    },
    {
      day: "Wed",
      date: "Jan 29",
      high: 18,
      low: 12,
      condition: "cloudy",
      summary:
        "Cloudy skies with much cooler temperatures. High near 18°F. North wind 15-20 mph. Bundle up for cold conditions.",
      wind: "18 mph N",
      humidity: "45%",
      precipitation: "20%",
      uv: "Low",
    },
    {
      day: "Thu",
      date: "Jan 30",
      high: 37,
      low: 22,
      condition: "partlyCloudy",
      summary:
        "Partly cloudy and warming up. High near 37°F with light winds. A pleasant day with breaks of sunshine expected.",
      wind: "8 mph W",
      humidity: "35%",
      precipitation: "5%",
      uv: "Moderate",
    },
    {
      day: "Fri",
      date: "Jan 31",
      high: 21,
      low: 15,
      condition: "cloudy",
      summary:
        "Overcast skies and cold temperatures persist. High near 21°F. Northeast wind around 12 mph. Gray skies expected.",
      wind: "12 mph NE",
      humidity: "50%",
      precipitation: "30%",
      uv: "Low",
    },
    {
      day: "Sat",
      date: "Feb 1",
      high: 41,
      low: 25,
      condition: "sunny",
      summary:
        "Sunny and pleasant with high near 41°F. Light southwest wind. A beautiful day to spend outdoors with clear blue skies.",
      wind: "6 mph SW",
      humidity: "30%",
      precipitation: "0%",
      uv: "Moderate",
    },
    {
      day: "Sun",
      date: "Feb 2",
      high: 24,
      low: 18,
      condition: "cloudy",
      summary:
        "Mostly cloudy with cooler temperatures. High near 24°F. Light variable winds throughout the day.",
      wind: "10 mph W",
      humidity: "40%",
      precipitation: "15%",
      uv: "Low",
    },
  ];

  const handleExpandClick = (index) => {
    setExpandedDay(expandedDay === index ? null : index);
  };

  return (
    <>
      {dailyData.slice(0, timeCount).map((day, idx) => (
        <Box key={idx} sx={{ width: "100" }}>
          <Card
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: 3,
              transition: "all 0.2s",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <CardContent
              onClick={() => handleExpandClick(idx)}
              sx={{
                p: 2,
                "&:last-child": { pb: 2 },
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flex: 1,
                  }}
                >
                  <Box sx={{ minWidth: 70 }}>
                    <Typography
                      variant="body1"
                      sx={{ color: "white", fontWeight: 600 }}
                    >
                      {day.day}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                    >
                      {day.date}
                    </Typography>
                  </Box>

                  <WeatherIcon
                    condition={day.condition}
                    sx={{ fontSize: 32 }}
                  />

                  <Box sx={{ display: "flex", gap: 1.5, ml: "auto" }}>
                    <Typography
                      variant="body1"
                      sx={{ color: "white", fontWeight: 600 }}
                    >
                      {day.high}°
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "rgba(255, 255, 255, 0.6)" }}
                    >
                      {day.low}°
                    </Typography>
                  </Box>
                </Box>

                <IconButton
                  size="small"
                  sx={{
                    color: "white",
                    ml: 1,
                    transform:
                      expandedDay === idx ? "rotate(180deg)" : "rotate(0deg)",
                    transition: theme.transitions.create("transform", {
                      duration: theme.transitions.duration.shortest,
                    }),
                  }}
                >
                  <ExpandMore />
                </IconButton>
              </Box>
            </CardContent>

            <Collapse in={expandedDay === idx} timeout="auto" unmountOnExit>
              <Box
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(10px)",
                  p: 2,
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "white",
                    lineHeight: 1.6,
                    mb: 2,
                  }}
                >
                  {day.summary}
                </Typography>

                <Grid container spacing={1.5}>
                  <Grid item xs={6}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Air
                        sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: 20 }}
                      />
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                        >
                          Wind
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "white", fontWeight: 500 }}
                        >
                          {day.wind}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Opacity
                        sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: 20 }}
                      />
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                        >
                          Humidity
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "white", fontWeight: 500 }}
                        >
                          {day.humidity}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Grain
                        sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: 20 }}
                      />
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                        >
                          Precip
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "white", fontWeight: 500 }}
                        >
                          {day.precipitation}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <WbSunny
                        sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: 20 }}
                      />
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                        >
                          UV Index
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "white", fontWeight: 500 }}
                        >
                          {day.uv}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Collapse>
          </Card>
        </Box>
      ))}
    </>
  );
}
