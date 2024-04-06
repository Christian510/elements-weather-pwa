
import { createTheme } from '@mui/material/styles';

const grey = {
    50: '#f7f7f7',
    100: '#eeeeee',
    200: '#e1e1e1',
    300: '#cfcfcf',
    400: '#aaaaaa',
    500: '#898989',
    600: '#626262',
    700: '#4f4f4f',
    800: '#313131',
    900: '#111111',
  };

const ElmTheme = createTheme({
    palette: {
        mode: 'dark'
    },
    });
    console.log('ElmTheme: ', ElmTheme.palette.primary.dark);



    export default ElmTheme;
