import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
   breakpoints: {
      keys: {
         0: 'xs',
         1: 'sm',
         2: 'md',
         3: 'lg',
         4: 'xl',
         5: 'custom1100',
         6: 'custom1365',
      },
      values: {
         xs: 0,
         sm: 600,
         md: 960,
         lg: 1280,
         xl: 1920,
         custom1100: 1100,
         custom1365: 1365,

      },
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
   shadows: [ //вызываются theme.spacing[порядковый номер в этом массиве]
      'none',
      "0px 0px 20px rgba(0, 0, 0, 0.1)",
      "0px 0px 40px rgba(0, 0, 0, 0.1)",
   ],
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
         // maxWidthLg: {
         //       maxWidth: '1048px',
         //    },
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
         },
         contained: {
            boxShadow: 'none',
         },
      },


   }
});

export default theme;