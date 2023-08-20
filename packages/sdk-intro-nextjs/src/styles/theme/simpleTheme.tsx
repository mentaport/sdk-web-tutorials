/* eslint-disable */
import { createTheme } from '@mui/material/styles';

const simpleTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FB448B',
    },
    secondary: {
      main: '#f3fb76',
    },
  },
  typography: {
    subtitle1: {
      lineHeight: 1.6,
      fontSize: 18,
    },
    //@ts-ignore
    description1: {
      lineHeight: 1.6,
      fontSize: 18,
      fontWeight: 500,
    },
  }
});

export default simpleTheme;
