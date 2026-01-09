  import Box from "@mui/material/Box";
  import Typography from "@mui/material/Typography";

  
  const WeatherStat = ({ icon: Icon, label, value }) => (
    <Box display="flex" alignItems="center">
      <Icon fontSize="small" sx={{ color: "grey.600", mr: 1 }} />
      <Box>
        <Typography variant="body2" sx={{ color: "grey.600" }}>
          {label}
        </Typography>
        <Typography variant="body1">{value}</Typography>
      </Box>
    </Box>
  );

  export default WeatherStat;