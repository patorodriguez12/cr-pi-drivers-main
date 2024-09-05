// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Color primario
    },
    secondary: {
      main: '#FF1E00', // Color secundario
    },
    tertiary: {
      main: '#E8F9FD',
    }
  },
});

export default theme;
