import { useState, useEffect, useMemo } from "react";
import Carousel from "../../components/Carousel/Carousel";
import { useParams, useNavigate } from "react-router-dom";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import ThermostatOutlinedIcon from "@mui/icons-material/ThermostatOutlined";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Typography from "@mui/material/Typography";
import ElmSpinner from "../../components/ElmSpinner/ElmSpinner";
import { styled, useTheme } from "@mui/material/styles";
import { useLoaderData } from "react-router-dom";
import {
  fetchAllData,
  addFavorite,
  // fetchExtendedForecast
} from "../../models/weather_api";
import { fetchOneElmIcon } from "../../models/elmIcons";
import { Button } from "@mui/material";
import { StyledButtonLink } from "../../components/StyledButtonLink";
import ElmFooter from "../../components/ElmFooter/ElmFooter";
import TerrainOutlinedIcon from "@mui/icons-material/TerrainOutlined";
import ElmDivider from "../../components/ElmDivider";
import { parseUrl, convertDateStr } from "../../utils/utl_functions";
import "../../styles/weather-icons.min.css";
import WeatherIcon from "../../components/WeatherIcon/WeatherIcon";
import HourlyForecastCard from "../../components/ForecastCard/HourlyForecastCard";
import DailyForecastCard from "../../components/ForecastCard/DailyForecastCard";
import WeatherStat from "../../components/WeatherStat/WeatherStat";

export default function CurrentConditions() {
  const theme = useTheme();
  const navigate = useNavigate();
  let { location } = useParams();
  const { forecasts, iconValues, sessionId } = useLoaderData();
  const params = useMemo(() => JSON.parse(location), [location]);
  const [dailyForecast, setForecast] = useState(); // remame to currentPeriod
  const [hourlyForecast, setHourlyForecast] = useState();
  const match = useMemo(
    () => forecasts.find((f) => f.location.location_id === params.location_id),
    [forecasts, params]
  );
  
  // console.log('dailyForecast: ', dailyForecast);
  useEffect(() => {
    if (!params) return null;
    if (params) {
      setTimeout(() => {
        fetchAllData(params)
          .then((result) => {
            setForecast(result);
            setHourlyForecast(result.hourlyForecast);
          })
          .catch((err) => console.error(err));
      }, 50);
    }
  }, [params]);

  const hourlyData = useMemo(() => {
    const iconMap = new Map(iconValues?.icons.map((icon) => [icon.icon, icon]));

    if (!hourlyForecast) return [];
    return hourlyForecast.properties.periods.map((item, index) => {
      let iconName = parseUrl(item.icon);
      let iconObj = {};
      iconObj = iconMap.get(iconName);
      return {
        key: item.number,
        title: item.name,
        iconObj: iconObj,
        forecast: item.shortForecast,
        temp: item.temperature,
        tempUnit: item.temperatureUnit,
        isDaytime: item.isDaytime,
        time: index === 0 ? "Now" : convertDateStr(item.startTime),
      };
    });
  }, [hourlyForecast, iconValues]);

  const dailyData = useMemo(() => {
    if (!dailyForecast) return [];
    return dailyForecast.forecast.properties.periods.map((item, index) => {
      let iconName = parseUrl(item.icon);
      let iconObj = {};
      iconObj = iconValues.icons.find((icon) => icon.icon === iconName);
      return {
        key: item.number,
        title: item.name,
        iconObj: iconObj,
        forecast: item.detailedForecast,
        temp: item.temperature,
        tempUnit: item.temperatureUnit,
        isDaytime: item.isDaytime,
        time: item.name,
      };
    });
  }, [dailyForecast, iconValues]);

  const currentPeriod = dailyForecast?.forecast.properties.periods[0];
  const currentTemp = hourlyForecast?.properties.periods[0].temperature;
  // console.log('currrentPeriod: ', currentPeriod);
  const values = useMemo(() => {
    if (!currentPeriod) {
      return {
        dateTime: null,
        temp: null,
        tempScale: null,
        iconUrl: null,
        parsedIcon: null,
        name: null,
        state: null,
        elevation: null,
        isDay: null,
        loading: true,
        detailedForecast: null,
        fetchExtendedForecast: null,
        shortForecast: null,
        location: null,
        lat: null,
        lng: null,
      };
    }

    const iconUrl = hourlyForecast?.properties.periods[0].icon;
    const parsedIcon = iconUrl ? parseUrl(iconUrl) : null;

    return {
      temp: currentTemp,
      tempScale: currentPeriod.temperatureUnit,
      iconUrl: iconUrl,
      parsedIcon: parsedIcon,
      name: dailyForecast.location.name,
      state: dailyForecast.location.state,
      elevation: Math.round(
        3.28084 * (dailyForecast.forecast.properties.elevation.value || 0)
      ),
      detailedForecast: currentPeriod.detailedForecast,
      isDay: currentPeriod.isDaytime,
      lat: dailyForecast.location.lat,
      lng: dailyForecast.location.lng,
      loading: false,
    };
  }, [dailyForecast, currentPeriod, hourlyForecast, currentTemp]);

  const [elmIcon, setElmIcon] = useState({});
  useEffect(() => {
    if (!values.parsedIcon) {
      return;
    }

    let aborted = false;
    fetchOneElmIcon(values.parsedIcon).then((result) => {
      if (!aborted) {
        setElmIcon(result?.icon[0]);
      }
    });

    return () => {
      aborted = true;
      setElmIcon({});
    };
  }, [values.parsedIcon]);

  function handleAddFavorite(location, sessionID) {
    setTimeout(() => {
      addFavorite(location, sessionID).then((resp) => {
        // if undefined, then something is wrong
        // console.log("addFavorite resp: ", resp);
        if (resp === undefined) {
          alert("Location Not added to favorites. Please try again.");
          return;
        }
        if (resp.result === 1) {
          return navigate("/");
        }
        if (resp.result === 0) {
          alert("Location Not added to favorites. Please try again.");
        }
      });
    }, 50);
  }

  const StyledContainer = styled(Box)(({ theme }) => ({
    height: "100%",
    backgroundColor: theme.palette.primary.light,
    backgroundImage: `url(${values.iconUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: (theme.zIndex.outlet = theme.zIndex.modal),
  }));

  return (
    <>
      {values.loading === true ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
          overflowY='scroll'

        >
          <ElmSpinner size="100px" />
        </Box>
      ) : (
        <StyledContainer
          id="weather-forecast"
          display="flex"
          flexDirection="column"
        >
          <Box
            id="top-nav"
            display="flex"
            justifyContent="space-between"
            sx={{
              padding: "0.5em 0 0.5em 0",
            }}
          >
            {!match && (
              <>
                <StyledButtonLink
                  to={"/"}
                  sx
                  disableRipple={true}
                  variant="text"
                  color="primary"
                >
                  Cancel
                </StyledButtonLink>
                <StyledButtonLink
                  component={Button}
                  disableRipple
                  onClick={() => handleAddFavorite(params, sessionId)}
                  type="submit"
                >
                  Add
                </StyledButtonLink>
              </>
            )}
          </Box>
          <Box
            id="scollable-view"
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
              height: "100%",
              overflowY: "auto",
              marginRight: ".5em",
              marginLeft: ".5em",
            }}
          >
            <Box
              id="content"
              display="flex"
              flexDirection="column"
              alignItems="center"
              backgroundColor="white"
              width="100%"
              // height="100%"
              sx={{
                padding: "1em",
                color: "black",
                borderRadius: "10px",
              }}
            >
              <FlexBoxColCenter>
                <Typography id="location" variant="h5">
                  {values.name}, {values.state}
                </Typography>
                <Box
                  id="coordinates"
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    color: theme.palette.grey[600],
                    marginTop: ".5em",
                    marginBottom: ".5em",
                  }}
                >
                  <PlaceOutlinedIcon fontSize="small" color="inherit" />
                  <StyledTypography variant="body1" sx={lateralMargins}>
                    {`${values.lat}\u00B0`},
                  </StyledTypography>
                  <StyledTypography
                    variant="body1"
                    sx={lateralMargins}
                    color="inherit"
                  >
                    {`${values.lng}\u00B0`},
                  </StyledTypography>
                  <TerrainOutlinedIcon fontSize="small" />
                  <StyledTypography
                    id="elevation"
                    variant="body1"
                    sx={lateralMargins}
                    color="inherit"
                  >
                    {values.elevation} ft
                  </StyledTypography>
                </Box>
              </FlexBoxColCenter>
              <FlexBoxRowCenter>
                <FlexBoxColCenter
                  sx={{
                    width: "2em",
                    height: "2em",
                  }}
                >
                  <WeatherIcon
                    iconObj={elmIcon}
                    isDay={values.isDay}
                    size="med"
                    color={theme.palette.grey[600]}
                  />
                </FlexBoxColCenter>
                <Box
                  sx={{
                    marginTop: ".5em",
                    marginBottom: ".5em",
                  }}
                >
                  <Typography
                    id="temp"
                    sx={{
                      paddingLeft: ".3em",
                    }}
                    variant="h3"
                  >
                    {values.temp}&deg;{values.tempScale}
                  </Typography>
                </Box>
              </FlexBoxRowCenter>

              <ElmDivider />

              <FlexBoxRowCenter
                id="detailed-forecast"
                sx={{ padding: "0 1.6em" }}
              >
                <Typography variant="body1">
                  {values.detailedForecast}
                </Typography>
              </FlexBoxRowCenter>
              <ElmDivider />
              <Box sx={{ width: "100%", maxWidth: "330px" }}>
                <Grid container columnSpacing={{ xs: 2, sm: 3 }} rowSpacing={2}>
                  <Grid item xs={6} sm={6} md={6}>
                    <Stack spacing={2}>
                      <WeatherStat
                        icon={AirOutlinedIcon}
                        label="Wind"
                        value="25 mph"
                      />
                      <WeatherStat
                        icon={WaterDropOutlinedIcon}
                        label="Humidity"
                        value="25%"
                      />
                      <WeatherStat
                        icon={VisibilityOutlinedIcon}
                        label="Visibility"
                        value="10 mi"
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    <Stack spacing={2}>
                      <WeatherStat
                        icon={SpeedOutlinedIcon}
                        label="Pressure"
                        value="30.1 in"
                      />
                      <WeatherStat
                        icon={ThermostatOutlinedIcon}
                        label="Dew Point"
                        value="45°F"
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
              <ElmDivider />
              <Carousel 
                title="Hourly Forecast" 
                Icon={AccessTimeIcon} 
                iconProps={{ fontSize: "small", sx: { color: "white", mr: 1 }} }
                direction="row"
                spacing={1} 
                >
                <HourlyForecastCard content={hourlyData} styles timeCount={25} />
              </Carousel>
              <ElmDivider />
                {/* <DailyForecastCard content={dailyData} styles /> */}
              <Carousel 
                title="Daily Forecast" 
                Icon={CalendarMonthIcon} 
                iconProps={{ fontSize: "small", sx: { color: "white", mr: 1 }} }
                direction="column"
                spacing={2}
                >
                <DailyForecastCard content={dailyData} styles direction="column" />
              </Carousel>
            </Box>
          </Box>
          <ElmFooter />
        </StyledContainer>
      )}
    </>
  );
}

const lateralMargins = {
  marginLeft: ".3em",
  marginRight: ".3em",
};

const StyledTypography = styled(Typography)(({ theme }) => ({
  padding: "0, .3em, 0, .3em",
}));

const FlexBoxColCenter = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const FlexBoxRowCenter = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
}));
