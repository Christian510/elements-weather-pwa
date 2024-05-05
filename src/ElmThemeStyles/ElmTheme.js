
import { createTheme } from '@mui/material/styles';
import { palette } from '@mui/system';

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

export const ElmTheme = createTheme({
  palette: {
    mode: 'dark'
  },
});
console.log('ElmTheme: ', ElmTheme);

// export const cardButtonTheme = createTheme({
//   components: {
//     MuiButtonBase: {
//       styleOverrides: {
//         root: {
//           color: palette,
//           backgroundColor: '#fff',
//           borderRadius: 4, 
//           boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', 
//           padding: '16px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           // cursor: 'pointer', 
//         },
//       },
//     },
//   },
// });
// console.log('cardButtonTheme: ', cardButtonTheme);

