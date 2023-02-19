import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#5bbba1",
    },
    error: {
      main: "#d32f2f",
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...!ownerState.disableGutters && {
            [theme.breakpoints.down('md')]: {
              padding: '0 10px',
            },
            [theme.breakpoints.down('sm')]: {
              padding: '0 5px',
            },
          },
        }),
      }
    }
  }
});
