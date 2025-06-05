import { forwardRef } from "react";
import { styled } from '@mui/material/styles';
import { Button, ButtonBase, Box, Link, Typography } from "@mui/material";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { formatDateTime } from '../../models/date.js';

function ListCard({ id, data, sessionId, handleDeleteFavorite }){
  // const theme = useTheme();

  const ForwardRefLink = forwardRef(
    (linkProps, ref) => (
      <Link ref={ref} to={linkProps.to} {...linkProps} />
    )
  );
  const path = `forecast/${encodeURIComponent(JSON.stringify(data.location))}`;
  let icon = null;
  let temp = null;
  // let tempUnit = null;
  let shortForecast = "Forecast unavailable.";
  let time = null;
  const location_id = data.location.location_id
  const name = data?.location.name;
  if (data.forecast) {
    icon = data?.forecast.properties.periods[0].icon;
    temp = data?.forecast.properties.periods[0].temperature;
    // tempUnit = data?.forecast.properties.periods[0].temperatureUnit;
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
    color: theme.palette.text.primary,
    textShadow: '1px 1px 5px gray',
    width: '100%',
    flex: 'none',
    scrollSnapAlign: 'center',
  }));

  return (
    <StyledContainer id={id} className="list-card_container">
      <StyleScrollBehavior 
      className="list-card_scroll-behavior" 
      dir="ltr"
      >
        <StyledButton
          className="list-card"
          component={ForwardRefLink}
          href={path}
          sx={{
          height: 'inherit',
          marginRight: '.75em',
        }}
        >
          <Box
            className='inner-box'
            sx={{
              padding: '0 0 0 .75em',
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 'inherit',
            }}
            p={1}
          >
            <Box
              className="content-left"
              flexDirection='row'
              justifyContent='flex-start'
              sx={{
                width: '80%',
                height: 'inherit',
              }}
            >
              <Box
                display='flex'
                flexDirection='column'
                justifyContent='space-around'
                sx={{
                  height: 'inherit',
                }}
              >
                <Box id='title'>
                  <Typography variant="h4" >
                    {name}
                  </Typography>
                  <Typography variant="subtitle2" >
                    {time}
                  </Typography>
                </Box>
                <Typography variant="body2" >
                  {shortForecast}
                </Typography>
              </Box>
            </Box>
            <Box
              id="temperature"
              display='inherit'
              flexDirection='row'
              justifyContent='center'
              alignItems='center'
              sx={{ width: '25%' }}
            >
              <Typography variant="h3">
                {temp}&deg;
              </Typography>
            </Box>
          </Box>
        </StyledButton>
        <Button
          id={`delete-button_${location_id}`}
          variant="contained"
          color="error"
          // size="large"
          sx={{
            width: '7.5em',
            height: 'inherit',
            borderRadius: 'unset',
            borderTopLeftRadius: '15px',
            borderBottomLeftRadius: '15px',
            scrollSnapAlign: 'end',
            flex: 'none',
          }}
          onClick={() => handleDeleteFavorite(location_id, sessionId)}
        >
          <DeleteSweepIcon fontSize="large" sx={{height: '100%'}} />
        </Button>
      </StyleScrollBehavior>
    </StyledContainer>
  );
};

const StyledContainer = styled('div')`
  margin: 1.25em .6em;
  display: flex;
  justify-content: center;
`;
const StyleScrollBehavior = styled('div')`
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scroll-snap-stop: always;
  display: flex;
  align-items: flex-start;
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-width: none;
  border-radius: 15px;
  width: 100%;
  max-width: 31.25em;
  height: 7.5em;
  min-height: 7.5em;
`;

export default ListCard;