import { createTheme } from '@mui/material/styles';

export const globalTheme = createTheme({
  palette: {
    // mode: 'dark',
    primary: {
      // light: '#337066',
      main: '#004d40',
      // dark: '#00352c',
      // contrastText: '#fff',
    },
    secondary: {
      main: '#f9a825',
      // light: '#fab950',
      // dark: '#ae7519',
      // contrastText: '#000',
    },
    action: {
      // active: '#00352c',
      // hover: '#f9a825',
      // hoverOpacity: 0.08,
      // selected: '#f9a825',
      // selectedOpacity: 0.14,
      // disabled: '#f9a825',
      // disabledOpacity: 0.26,
      // disabledBackground: '#f9a825',
      // focus: '#f9a825',
      // focusOpacity: 0.12,
      // activatedOpacity: 0.12,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          '&:hover': {
            opacity:0.5,
          },
        }),
      },
    },
  },
});
