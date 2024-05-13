
import { createTheme } from '@mui/material/styles';
import { palette } from '@mui/system';
// console.log('palette: ', palette);

export const ElmTheme = createTheme({
  palette: {
    mode: 'dark',
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

