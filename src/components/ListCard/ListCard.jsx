import React, { forwardRef } from "react";
import { styled, useTheme } from '@mui/material/styles';
import { Button, ButtonBase, Box, Link } from "@mui/material";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { formatDateTime } from '../../models/date.js';

export default function ListCard({ id, data, sessionId, handleDeleteFavorite }) {
  // const theme = useTheme();
  // const [drawerOpen, setDrawerOpen] = useState('false');
  // const [isDragging, setIsDragging] = useState('false');

  const ForwardRefLink = forwardRef(
    (linkProps, ref) => (
      <Link ref={ref} to={linkProps.to} {...linkProps} />
    )
  );
  const path = `forecast/${encodeURIComponent(JSON.stringify(data.location))}`;
  let icon = null, temp = null, tempUnit = null, shortForecast = "Oops can't retrieve the forecast!", time = null;
  const location_id = data.location.location_id
  const name = data?.location.name;
  if (data.forecast) {
    icon = data?.forecast.properties.periods[0].icon;
    temp = data?.forecast.properties.periods[0].temperature;
    tempUnit = data?.forecast.properties.periods[0].temperatureUnit;
    shortForecast = data?.forecast.properties.periods[0].shortForecast;
  }
  if (data.dateTime) {
    const dateTime = formatDateTime(data?.dateTime.time);
    time = dateTime.time;
  }

  const StyledButton = styled(ButtonBase)(({ theme }) => ({
    background: theme.palette.info.main,
    backgroundImage: `url(${icon})`,
    backgroundSize: 'cover',
    borderRadius: '15px',
    color: 'white',
    textShadow: '1px 1px 5px gray',
    width: '100%',
    marginRight: '.5em',
    flex: 'none',
    scrollSnapAlign: 'center',
  }));

  return (
    <StyledContainer id={id} className="list-card_container"
      // draggable={isDragging}
      // cursor: isDragging ? "grabbing" : "pointer",
      // onTouchStart={(e) => console.log('touch start: ', e)}
      onTouchMove={(e) => console.log('touch move: ', e.touches)}

    >
      <StyleScrollBehavior className="list-card_scroll-behavior" dir="ltr" >
        <StyledButton
          className="list-card"
          component={ForwardRefLink}
          href={path}
        >
          <Grid container
            justifyContent='space-between'
            alignItems='center'
            spacing={{
              xs: 6,
              md: 8,
            }} >
            <Grid xs={5} sm={5} md={5}>
              <Box
                display="flex"
                justifyContent='space-between'
                flexDirection='column'
                gap={2}
                p={2}
                sx={{ margin: 0, width: '100%', flex: 'none' }} >
                <div>
                  <h2>{name}</h2>
                  <p>{time}</p>
                </div>
                <p>{shortForecast}</p>
              </Box>
            </Grid>
            <Grid xs={4.5} sm={4} md={2}>
              <Box
                display="flex"
                justifyContent='space-between'
                alignItems='center'
                flexDirection='column'
                gap={2}
                p={2}
                sx={{ margin: 0 }}  >
                <h1>{temp}&deg; {tempUnit}</h1>
                {/* <p>H:75&deg; L:50&deg;</p> */}
              </Box>
            </Grid>
          </Grid>

        </StyledButton>
        <Button
          className="delete-button_a"
          size="large"
          sx={{
            width: '7em',
            borderRadius: 'unset',
            borderTopLeftRadius: '15px',
            borderBottomLeftRadius: '15px',
            padding: '8px 40px ',
            scrollSnapAlign: 'end',
            flex: 'none',
          }}
          variant="contained"
          color="error"
          onClick={() => handleDeleteFavorite(location_id, sessionId)}
        >
          <DeleteSweepIcon fontSize="large" />
        </Button>
      </StyleScrollBehavior>
    </StyledContainer>
  );
};

const StyledContainer = styled('div')`
  margin: 1.25em auto;
`;
const StyleScrollBehavior = styled('div')`
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scroll-snap-stop: always;
  display: flex;
  align-items: stretch;
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-width: none;
  border-radius: 15px;
  max-height: 7.5em;
`;