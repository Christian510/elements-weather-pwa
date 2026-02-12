/*
This is a demo of the Tem day weather view.
*/

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Collapse,
  Grid,
  Divider,
  useTheme
} from '@mui/material';
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
  CalendarToday
} from '@mui/icons-material';

export default function DemoView() {
  const [expandedDay, setExpandedDay] = useState(null);
  const theme = useTheme();

  const weatherIcons = {
    sunny: WbSunny,
    partlyCloudy: CloudQueue,
    cloudy: Cloud,
    rainy: Grain
  };

  const hourlyData = [
    { time: 'Now', temp: 35, condition: 'rainy' },
    { time: '2 PM', temp: 36, condition: 'partlyCloudy' },
    { time: '3 PM', temp: 38, condition: 'partlyCloudy' },
    { time: '4 PM', temp: 37, condition: 'partlyCloudy' },
    { time: '5 PM', temp: 36, condition: 'partlyCloudy' }
  ];

  const dailyData = [
    {
      day: 'Today',
      date: 'Jan 28',
      high: 38,
      low: 35,
      condition: 'partlyCloudy',
      summary: 'Mostly sunny with temperatures near 38°F. West southwest wind around 8 mph. Clear skies expected throughout most of the day.',
      wind: '25 mph SW',
      humidity: '25%',
      precipitation: '10%',
      uv: 'Low'
    },
    {
      day: 'Wed',
      date: 'Jan 29',
      high: 18,
      low: 12,
      condition: 'cloudy',
      summary: 'Cloudy skies with much cooler temperatures. High near 18°F. North wind 15-20 mph. Bundle up for cold conditions.',
      wind: '18 mph N',
      humidity: '45%',
      precipitation: '20%',
      uv: 'Low'
    },
    {
      day: 'Thu',
      date: 'Jan 30',
      high: 37,
      low: 22,
      condition: 'partlyCloudy',
      summary: 'Partly cloudy and warming up. High near 37°F with light winds. A pleasant day with breaks of sunshine expected.',
      wind: '8 mph W',
      humidity: '35%',
      precipitation: '5%',
      uv: 'Moderate'
    },
    {
      day: 'Fri',
      date: 'Jan 31',
      high: 21,
      low: 15,
      condition: 'cloudy',
      summary: 'Overcast skies and cold temperatures persist. High near 21°F. Northeast wind around 12 mph. Gray skies expected.',
      wind: '12 mph NE',
      humidity: '50%',
      precipitation: '30%',
      uv: 'Low'
    },
    {
      day: 'Sat',
      date: 'Feb 1',
      high: 41,
      low: 25,
      condition: 'sunny',
      summary: 'Sunny and pleasant with high near 41°F. Light southwest wind. A beautiful day to spend outdoors with clear blue skies.',
      wind: '6 mph SW',
      humidity: '30%',
      precipitation: '0%',
      uv: 'Moderate'
    },
    {
      day: 'Sun',
      date: 'Feb 2',
      high: 24,
      low: 18,
      condition: 'cloudy',
      summary: 'Mostly cloudy with cooler temperatures. High near 24°F. Light variable winds throughout the day.',
      wind: '10 mph W',
      humidity: '40%',
      precipitation: '15%',
      uv: 'Low'
    }
  ];

  const handleExpandClick = (index) => {
    setExpandedDay(expandedDay === index ? null : index);
  };

  const WeatherIcon = ({ condition, sx = {} }) => {
    const IconComponent = weatherIcons[condition];
    return <IconComponent sx={{ color: '#FFC107', ...sx }} />;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#9E9E9E',
        p: 2,
        pb: 10
      }}
    >
      {/* Status Bar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white',
          mb: 3,
          px: 1
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          1:51
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 0.25 }}>
            {[3, 4, 5, 3].map((height, i) => (
              <Box
                key={i}
                sx={{
                  width: 2,
                  height: height * 3,
                  bgcolor: i === 3 ? 'rgba(255,255,255,0.5)' : 'white',
                  borderRadius: 0.5
                }}
              />
            ))}
          </Box>
          <WbSunny sx={{ fontSize: 16 }} />
          <Box
            sx={{
              width: 24,
              height: 12,
              bgcolor: 'white',
              borderRadius: 0.5,
              border: '2px solid white',
              position: 'relative'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                right: 0,
                top: 0,
                height: '100%',
                width: '50%',
                bgcolor: 'white'
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Weather Summary Card */}
      <Card
        sx={{
          borderRadius: 4,
          mb: 2,
          boxShadow: 3
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="body1"
            sx={{
              color: 'text.primary',
              lineHeight: 1.6,
              mb: 3
            }}
          >
            Mostly sunny. High near 38, with temperatures falling to around 36 in the afternoon.
            West southwest wind around 8 mph.
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Air sx={{ color: 'text.secondary' }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Wind
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    25 mph
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Speed sx={{ color: 'text.secondary' }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Pressure
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    30.1 in
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Opacity sx={{ color: 'text.secondary' }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Humidity
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    25%
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography
                  variant="h6"
                  sx={{ color: 'text.secondary', width: 24, textAlign: 'center' }}
                >
                  °
                </Typography>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Dew Point
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    45°F
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Visibility sx={{ color: 'text.secondary' }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Visibility
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    10 mi
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Hourly Forecast Card */}
      <Card
        sx={{
          borderRadius: 4,
          mb: 2,
          background: 'linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%)',
          boxShadow: 3
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <AccessTime sx={{ color: 'white' }} />
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
              Hourly Forecast
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 3,
              overflowX: 'auto',
              pb: 1,
              '&::-webkit-scrollbar': { display: 'none' }
            }}
          >
            {hourlyData.map((hour, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: 60
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: 'white', opacity: 0.9, mb: 1.5 }}
                >
                  {hour.time}
                </Typography>
                <WeatherIcon condition={hour.condition} sx={{ fontSize: 40, mb: 1.5 }} />
                <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                  {hour.temp}°F
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Daily Forecast Card */}
      <Card
        sx={{
          borderRadius: 4,
          background: 'linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%)',
          boxShadow: 3
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <CalendarToday sx={{ color: 'white' }} />
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
              Daily Forecast
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              maxHeight: 320,
              overflowY: 'auto',
              pr: 1,
              '&::-webkit-scrollbar': {
                width: 6
              },
              '&::-webkit-scrollbar-track': {
                bgcolor: 'transparent'
              },
              '&::-webkit-scrollbar-thumb': {
                bgcolor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: 3
              }
            }}
          >
            {dailyData.map((day, idx) => (
              <Box key={idx}>
                <Card
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 3,
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.2)'
                    }
                  }}
                >
                  <CardContent
                    onClick={() => handleExpandClick(idx)}
                    sx={{
                      p: 2,
                      '&:last-child': { pb: 2 },
                      cursor: 'pointer'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                        <Box sx={{ minWidth: 70 }}>
                          <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                            {day.day}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            {day.date}
                          </Typography>
                        </Box>

                        <WeatherIcon condition={day.condition} sx={{ fontSize: 32 }} />

                        <Box sx={{ display: 'flex', gap: 1.5, ml: 'auto' }}>
                          <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                            {day.high}°
                          </Typography>
                          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                            {day.low}°
                          </Typography>
                        </Box>
                      </Box>

                      <IconButton
                        size="small"
                        sx={{
                          color: 'white',
                          ml: 1,
                          transform: expandedDay === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: theme.transitions.create('transform', {
                            duration: theme.transitions.duration.shortest
                          })
                        }}
                      >
                        <ExpandMore />
                      </IconButton>
                    </Box>
                  </CardContent>

                  <Collapse in={expandedDay === idx} timeout="auto" unmountOnExit>
                    <Box
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        p: 2,
                        borderBottomLeftRadius: 12,
                        borderBottomRightRadius: 12
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'white',
                          lineHeight: 1.6,
                          mb: 2
                        }}
                      >
                        {day.summary}
                      </Typography>

                      <Grid container spacing={1.5}>
                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Air sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 20 }} />
                            <Box>
                              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                Wind
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                                {day.wind}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>

                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Opacity sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 20 }} />
                            <Box>
                              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                Humidity
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                                {day.humidity}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>

                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Grain sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 20 }} />
                            <Box>
                              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                Precip
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                                {day.precipitation}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>

                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <WbSunny sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 20 }} />
                            <Box>
                              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                UV Index
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
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
          </Box>
        </CardContent>
      </Card>

      {/* Bottom Nav */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255, 255, 255, 0.6)'
        }}
      >
        <Typography variant="body2">MAP</Typography>
      </Box>
    </Box>
  );
}

