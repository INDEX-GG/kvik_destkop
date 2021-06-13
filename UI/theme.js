import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
   breakpoints: {
      keys: {
         0: 'xs',
         1: 'sm',
         2: 'md',
         3: 'lg',
         4: 'xl',
      },
      values: {
         xs: 0,
         sm: 600,
         md: 960,
         lg: 1280,
         xl: 1920,
      }
   },
   palette: {
      primary: {
         main: '#00A0AB',
      },
      secondary: {
         main: '#ffffff',
      },
      error: {
         main: '#F44545',
      },
      background: {
         default: '#fff',
      },
      grey: {
         '100': '#2c2c2c'
      }
   },
   typography: {
      h1: {

      },
      h2: {
         fontSize: '18px',
         fontWeight: 400,
      },
      button: {
         textTransform: "none",
         whiteSpace: 'none',
      },
      subtitle1: {
         color: '#C7C7C7',
         fontWeight: 400,
         fontSize: '14px',

      },
      subtitle2: {
         color: '#C7C7C7',
         fontWeight: 500,
         fontSize: '12px',
      }
   },
   shape: {
      borderRadius: 8,
   },
   overrides: {
      MuiContainer: {
         root: {
            display: 'flex',
            paddingLeft: '0',
            paddingRight: '0',
         },
      },
      MuiBox: {
         root: {
            display: 'flex',
         },
      },
      MuiList: {
         root: {
            display: 'flex',
         }
      },
      MuiButton: {
         root: {
         }
      },


   }
});

export default theme;