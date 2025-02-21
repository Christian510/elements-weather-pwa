import React from "react";
import {
  Outlet,
  useFetchers,
  useNavigation,
  useRevalidator,
} from "react-router-dom";
import { Container } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
// import './App.css';
import './index.css';
import Menu from './components/Menu/Menu';
import Header from './components/NavBar/Header';
import { fetchFavorites, fetchAllData } from './models/weather_api';
import ElmSearch from './components/ElmSearch/ElmSearch';

export async function loader() {
  try {
    const data = await fetchFavorites();
    console.log('fetchFavorites: ', data); // ***** DEBUGGING *****
    if (typeof data === "undefined" || typeof data === 'string') {
      return { forecasts: [], sessionId: "" }; // Not sure this is the best way to handle this
    }
    if (data) {
      const fetchForecasts = data.locations.map(
        async (l) => await fetchAllData(l)
      );
      const forecasts = await Promise.all(fetchForecasts);
      return { forecasts: forecasts, sessionId: data.session };
    }
  } catch (error) {
    console.error("Error fetching favorites: ", error);
    throw error;
  }
}

export function Home() {

  const theme = useTheme();
  let navigation = useNavigation();
  let revalidator = useRevalidator();
  let fetchers = useFetchers();
  let fetcherInProgress = fetchers.some((f) =>
    ["loading", "submitting"].includes(f.state)
  );

  return (
    <Container
      id="app-container"
      sx={{
        backgroundColor: theme.palette.background.default,
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100vh",
        margin: "auto",
      }}
    >
      <Header>
        <Menu />
        <ElmSearch />
      </Header>
      <StyledOutlet id="outlet">
        <Outlet />
      </StyledOutlet>
      <div style={{ position: "fixed", top: 40, right: 20 }}>
        {navigation.state !== "idle" && <p>Navigation in progress...</p>}
        {revalidator.state !== "idle" && <p>Revalidation in progress...</p>}
        {fetcherInProgress && <p>Fetcher in progress...</p>}
      </div>
    </Container>
  );
}

const StyledOutlet = styled("div")(({ theme }) => ({
  height: "100%",
  padding: "0 0 6em 0",
}));
