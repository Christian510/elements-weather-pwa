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
  Grain,
  Air,
  Opacity,
  ExpandMore,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import WeatherIcon from "../../components/WeatherIcon/WeatherIcon";
import { color } from "@mui/system";

export default function DailyForecastCard({ content, styles, timeCount }) {
  const [expandedDay, setExpandedDay] = useState(null);
  const theme = useTheme();

  console.log('content: ', content[0]);
  const handleExpandClick = (index) => {
    setExpandedDay(expandedDay === index ? null : index);
  };

  return (
    <>
      {content.slice(0, timeCount).map((day, idx) => (
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
                      {day.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                    >
                      {day.date}
                    </Typography>
                  </Box>

                  <WeatherIcon
                    isDay={day.isDay}
                    iconObj={day.iconObj}
                    color="white"
                    size="med"

                    // condition={day.condition}
                    // sx={{ fontSize: 32}}
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
                  {day.forecast}
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
