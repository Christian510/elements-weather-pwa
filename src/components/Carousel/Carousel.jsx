import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ElmSpinner from "../../components/ElmSpinner/ElmSpinner";

function Carousel({
  children,
  carouselName = 'container',
  spacing = 0,
  align = "center",    
  Icon,
  iconProps,
  direction = "row",
  loading = false,
  title = "",
  styles = {},
  containerHeight = "100%", // if containerHeight is less than 100%, it will scroll
}) {

  /* Carousel component
    Controls direction, alignment, and spacing of items
    Props:
    - children: items to be displayed in the carousel
    - icon: icon to be displayed before the title
    - direction: direction of the carousel
    - loading: true if the data is loading
    - title: title of the carousel
    - key: key of the carousel
  */
 
 // const height = {
  //   maxHeight: containerHeight,
  // }
  const StackStyles = {
    margin: ".5em auto",
    maxWidth: "100%",
  }
  const verticalScolling = {
    maxHeight: containerHeight,
    overflowX: "hidden",
    overflowY: "scroll",
    scrollBehavior: "smooth",
    scrollSnapType: "y mandatory",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "& > *": {
      flexShrink: 0,
      scrollSnapAlign: "start",
    },
  };
  
  const horizontalScolling = {
    maxHeight: containerHeight,
    overflowX: "scroll",
    overflowY: "hidden",
    scrollBehavior: "smooth",
    scrollSnapType: "x mandatory",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "& > *": {
      flexShrink: 0,
      scrollSnapAlign: "start",
    },
  };
  
  const scrollStyles = direction === "row" ? horizontalScolling : verticalScolling
    
  return (
    <>
      {loading ? (
        <ElmSpinner size="md" />
      ) : (
        <Box
            id={`carousel-${carouselName}`}
            sx={{
                ...styles,
                borderRadius: "8px",
                padding: "1em",
                width: "100%",
                minWidth: "23em",
            }} >
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                // alignItems: "flex-start",
                justifyContent: "flex-start",
                }}>
                <Icon {...iconProps} />
                <Typography variant="body1" sx={{ color: "white"}}>
                    {title}
                </Typography>
            </Box>
            <Stack // Controles spacing, alignment, and overflow, scolling
            className="carousel"
            direction={direction}
            spacing={spacing}
            sx={{
              ...StackStyles,
              ...scrollStyles,
            }}
            >
            {children}
            </Stack>
        </Box>
      )}
    </>
  );
}



export default Carousel;
