import { useState, useEffect } from "react";
import "../../styles/weather-icons.min.css";
// import { useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
// import { use } from "react";
// import { fontSize } from "@mui/system";

function WeatherIcon({
  isDay = true,
  iconObj = {},
  size = "sm",
  color = "grey",
  sx = [],
}) {
//   console.log("WeatherIcon: ", iconObj);
//   console.log('isDay: ', isDay);
//   console.log('size: ', size);
  // console.log('color: ', color);
  // const theme = useTheme();
  const [iconSize, setIconsSize] = useState(null);
  const [wIcon, setIcon] = useState({
    description: "",
    icon: "",
    id: null,
    weather_icon_day: "",
    weather_icon_night: "",
  });

  useEffect(() => {
    const sizes = [
      { name: "sm", value: "1em" },
      { name: "med", value: "2em" },
      { name: "lrg", value: "3em" },
    ];

    let findIconSize = sizes.find(({ name }) => name === size);
    // console.log('findIconSize: ', findIconSize);

    if (isDay === true) setIcon(iconObj.weather_icon_day);
    else setIcon(iconObj.weather_icon_night);
    
    // Future work to allow for custom size 
    // if (parseInt(size) === "number") {
    //     console.log('parseInt(size): ', parseInt(size));
    //     setIconsSize(`${parseInt(size)}px`);
    // }
    if (typeof size === "string") 
        setIconsSize(findIconSize.value);
  }, [size, color, iconSize, iconObj, isDay]);
  console.log('iconSize: ', iconSize);

  const IconStyles = styled("i")(({ theme }) => ({
    fontSize: iconSize,
    color: color || theme.palette.common.white,
  }));

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
    >
      <IconStyles className={`wi ${wIcon}`}></IconStyles>
    </Box>
  );
}

export default WeatherIcon;
