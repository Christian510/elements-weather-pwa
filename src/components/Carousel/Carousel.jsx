import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ElmSpinner from "../../components/ElmSpinner/ElmSpinner";

function Carousel({
  children,
  className = '',
  backgroundColor = "'linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%)'", // add this as a prop not fixed.
  spacing = 0,
  align = "center",    
  Icon,
  iconProps,
  direction = "row",
  loading = false,
  title = "",
  styles = {},
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

    const StackStyles = {
      margin: ".5em auto",
      height: "100%",
      maxHeight: "7.5em",
      maxWidth: "100%",
    }
    const verticalScolling = {
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
            className="carousel-container"
            sx={{
                backgroundColor: (theme) => theme.palette.primary.dark,
                borderRadius: "8px",
                // maxHeight: "200px",
                padding: "1em",
                width: "100%",
                minWidth: "23em",
            }}
        >
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
            // spacing={0.15}
            spacing={spacing}
            sx={{
              ...styles,
              ...StackStyles,
              ...scrollStyles,
              // display: "flex",
              // flexDirection: "row",
              // margin: ".5em auto",
              // height: "100%",
              // maxHeight: "7.5em",
              // alignItems: "flex-start",
              // overflowX: "scroll",
              // overflowY: "clip",
              // scrollBehavior: "smooth",
              // scrollSnapType: "x mandatory",
              //   "&::-webkit-scrollbar": {
              //   display: "none",
              //   },
              //   "& > *": {
              //   flexShrink: 0,
              //   scrollSnapAlign: "start",
              //   },
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
