import { useState, useEffect } from "react";
import Carousel from "../../components/Carousel/Carousel";
import { useParams, useNavigate } from "react-router-dom";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import ThermostatOutlinedIcon from "@mui/icons-material/ThermostatOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Typography from "@mui/material/Typography";
import ElmSpinner from "../../components/ElmSpinner/ElmSpinner";
// import ElmList from '../../components/ElmList/ElmList';
// import { formatDateTime } from '../../models/date';
import { styled, useTheme } from "@mui/material/styles";
import { useLoaderData } from "react-router-dom";
import { fetchAllData, addFavorite } from "../../models/weather_api";
import { Button } from "@mui/material";
import { StyledButtonLink } from "../../components/StyledButtonLink";
import ElmFooter from "../../components/ElmFooter/ElmFooter";
import TerrainOutlinedIcon from "@mui/icons-material/TerrainOutlined";
import ElmDivider from "../../components/ElmDivider";

export default function CurrentConditions() {
  // const theme = useTheme();
  const navigate = useNavigate();
  const { forecasts, sessionId } = useLoaderData();
  let { location } = useParams();
  const [locationData, setLocationData] = useState(null);
  const [match, setMatch] = useState(false);
  // const [hourly, setHourly] = useState();

  useEffect(() => {
    const params = JSON.parse(location);

    // pull locationData from Carousel and set to state here.
    const match = forecasts.find(
      (elm) => elm.location.location_id === params.location_id
    );
    if (match) {
      setLocationData(match);
      setMatch(true);
    }
    if (match === undefined) {
      setMatch(false);
      setTimeout(() => {
        fetchAllData(params).then((result) => setLocationData(result));
      }, 50);
    }
    return () => {
      setLocationData(null);
      setMatch(false);
    };
  }, [location, forecasts, sessionId]);

  // let dateTime = null;
  let temp = null;
  // let tempUnit = null;
  let detailedForecast = null;
  // let shortForecast = null;
  // let extendedForecast = null;
  let icon = null;
  let name = null;
  let state = null;
  let elevation = null;
  let tempScale = null;
  if (locationData) {
    console.log("locationData: ", locationData); // RAT
    // dateTime = formatDateTime(locationData.dateTime.time);
    temp = locationData?.forecast.properties.periods[0].temperature;
    tempScale = locationData?.forecast.properties.periods[0].temperatureUnit;
    icon = locationData?.forecast.properties.periods[0].icon;
    name = locationData?.location.name;
    state = locationData?.location.state;
    elevation = `${Math.round(
      3.28084 * locationData?.forecast.properties.elevation.value
    )}`;
    // tempUnit = forecast?.properties.periods[0].temperatureUnit;
    detailedForecast =
      locationData?.forecast.properties.periods[0].detailedForecast;
    // shortForecast = locationData?.forecast.properties.periods[0].shortForecast;
    // extendedForecast = locationData?.forecast.properties.periods;
  }

  function handleAddFavorite(location, sessionID) {
    setTimeout(() => {
      addFavorite(location, sessionID).then((resp) => {
        // if undefined, then something is wrong
        console.log("addFavorite resp: ", resp);
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

  const theme = useTheme();
  console.log("theme: ", theme);
  const StyledContainer = styled(Box)(({ theme }) => ({
    height: "100%",
    backgroundColor: theme.palette.primary.light,
    backgroundImage: `url(${icon})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: (theme.zIndex.outlet = theme.zIndex.modal),
  }));

  const WeatherStat = ({ icon: Icon, label, value }) => (
  <Box display="flex" alignItems="center">
    <Icon fontSize="small" sx={{ color: 'grey.600', mr: 1 }} />
    <Box>
      <Typography variant="body2" sx={{ color: 'grey.600' }}>{label}</Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  </Box>
);

  return (
    <>
      {!locationData ? (
        <ElmSpinner size="lg" />
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
                  onClick={() =>
                    handleAddFavorite(locationData.location, sessionId)
                  }
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
              sx={{
                padding: "1em",
                color: "black",
                borderRadius: "10px",
              }}
            >
              <FlexBoxColCenter>
                <Typography id="location" variant="h5">
                  {name}, {state}
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
                    {`${locationData?.location.lat}\u00B0`},
                  </StyledTypography>
                  <StyledTypography
                    variant="body1"
                    sx={lateralMargins}
                    color="inherit"
                  >
                    {`${locationData?.location.lng}\u00B0`},
                  </StyledTypography>
                  <TerrainOutlinedIcon fontSize="small" />
                  <StyledTypography
                    id="elevation"
                    variant="body1"
                    sx={lateralMargins}
                    color="inherit"
                  >
                    {elevation} ft
                  </StyledTypography>
                </Box>
              </FlexBoxColCenter>
              <FlexBoxRowCenter>
                <FlexBoxColCenter>Icon</FlexBoxColCenter>
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
                    {temp}&deg;{tempScale}
                  </Typography>
                </Box>
              </FlexBoxRowCenter>

              <ElmDivider />

              <FlexBoxRowCenter
                id="detailed-forecast"
                sx={{ padding: "0 1.6em" }}
              >
                <Typography variant="body1">{detailedForecast}</Typography>
              </FlexBoxRowCenter>
              <ElmDivider />
              <Box sx={{ width: "100%", maxWidth: "330px" }}>
                <Grid
                  container
                  columnSpacing={{ xs: 2, sm: 3 }}
                  rowSpacing={2}
                >
                  <Grid item xs={6} sm={6} md={6}>
                    <Stack spacing={2}>
                      <WeatherStat icon={AirOutlinedIcon} label="Wind" value="25 mph" />
                      <WeatherStat icon={WaterDropOutlinedIcon} label="Humidity" value="25%" />
                      <WeatherStat icon={VisibilityOutlinedIcon} label="Visibility" value="10 mi" />
                    </Stack>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    <Stack spacing={2}>
                      <WeatherStat icon={SpeedOutlinedIcon} label="Pressure" value="30.1 in" />
                      <WeatherStat icon={ThermostatOutlinedIcon} label="Dew Point" value="45°F" />
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
              <ElmDivider />
              <Carousel forecast={locationData} />
            </Box>
          </Box>
          {match && (
            <>
              <ElmFooter />
            </>
          )}
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
