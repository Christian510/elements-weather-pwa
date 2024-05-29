import "../../styles/weather-icons.min.css";
import { weatherIcons } from "../../models/icon_map";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";

export default function WeatherIcon({ isday=true, icon='', size='sm', color='', sx=[] }){
    const theme = useTheme();
    const sizes = [{"sm": "1em"}, {"med": "2em"}, {"lrg": "3em"}];
    const iconSize = sizes.find((s) => s[size] );
    // if (typeof size === 'number') iconSize = `${size.toString()}em`;
    const iconMap = weatherIcons.find((w) => w.icon === icon);
    const iconMatch = isday ? iconMap?.weatherIcon.day : iconMap?.weatherIcon.night;

    let styles = {
        fontSize: iconSize ? iconSize[size] : null,
        color: color || theme.palette.common.white,
    };
    return (
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center' 
            sx={[
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            >
            <i className={`wi ${iconMatch}`} style={styles} ></i>
        </Box>
    );
   
};