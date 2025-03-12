import { CircularProgress } from '@mui/material';


export default function ElmSpinner({color = 'primary', size = '40', thickness = 4}) {

    return (
        <CircularProgress color={color} size={size} thickness={thickness} />
    )
}