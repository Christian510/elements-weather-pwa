import { useState } from "react";
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
import AuthModal from './components/AuthModal/AuthModal';
// import OfflineLoader from './components/OfflineLoader/OfflineLoader';
// import ElmSkeleton from "./components/ElmSkeleton/ElmSkeleton";

export function Home() {

  const theme = useTheme();
  let navigation = useNavigation();
  let revalidator = useRevalidator();
  let fetchers = useFetchers();
  let fetcherInProgress = fetchers.some((f) =>
    ["loading", "submitting"].includes(f.state)
  );

  const [authModalOpen, setAuthModalOpen] = useState(false);

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
          <ElmMenu onLoginClick={() => setAuthModalOpen(true)} />
          <ElmSearch />
        </Header>
        <StyledOutlet id="outlet">
          {/* <OfflineLoader skeletonLoader={<ElmSkeleton height={150} width={400}/>} time={3000} /> */}
          <Outlet />
        </StyledOutlet>
        <AuthModal
          open={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onLoginSuccess={() => revalidator.revalidate()}
        />
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