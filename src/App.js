import {
  Outlet,
  useFetchers,
  useNavigation,
  useRevalidator,
} from "react-router-dom";
import Box from '@mui/material/Box';
import { styled, useTheme } from "@mui/material/styles";
import './index.css';
import ElmMenu from './components/Menu/Menu';
import Header from './components/NavBar/Header';
import ElmSearch from './components/ElmSearch/ElmSearch';

export function Home() {

  const theme = useTheme();
  console.log("theme: ", theme)
  let navigation = useNavigation();
// console.log("navigation: ", navigation); // ****** DEBUG ****** //
  let revalidator = useRevalidator();
  let fetchers = useFetchers();
  let fetcherInProgress = fetchers.some((f) =>
    ["loading", "submitting"].includes(f.state)
  );

  // Add the loading spinner/skeleton placeholder here to show when a fetcher is in progress
  return (
    <>
      <Box
        id="app-container"
        sx={{
          backgroundColor: theme.palette.background.default,
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100vh",
          margin: "auto",
          // paddingRight: "1em",
          // paddingLeft: "1em",
        }}
      >
        <Header>
          <ElmMenu isLogedIn={ false } />
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
      </Box>
    </>
  );
}

const StyledOutlet = styled("div")(({ theme }) => ({
  height: "100%",
  padding: "0 0 6em 0",
}));
