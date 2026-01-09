import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ElmSpinner from "../../components/ElmSpinner/ElmSpinner";

function Carousel({
  children,
  icon: Icon,
  direction = "row",
  loading = false,
  title = "",
}) {
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
                // height: "100%",
                maxHeight: "200px",
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
                <Icon fontSize="small" sx={{ color: "white", mr: 1 }} />
                <Typography variant="body1" sx={{ color: "white"}}>
                    {title}
                </Typography>
            </Box>
            <Stack
            className="carousel"
            direction={direction}
            spacing={0.15}
            sx={{
                alignItems: "flex-start",
                margin: ".5em auto",
                height: "100%",
                maxHeight: "7.5em",
                overflowX: "scroll",
                scrollBehavior: "smooth",
                scrollSnapType: "x mandatory",
                "&::-webkit-scrollbar": {
                display: "none",
                },
                "& > *": {
                flexShrink: 0,
                scrollSnapAlign: "start",
                },
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
