import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1C1C1C',
    },
    secondary: {
      main: '#1E88E5',
    },
    background: {
      default: '#FAFAFA',
    },
  },
  typography: {
    fontFamily: 'Nanum Gothic, sans-serif',
  },
});

export default theme;