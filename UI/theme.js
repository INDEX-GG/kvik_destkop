import { createTheme } from '@material-ui/core';

const theme = createTheme({
   breakpoints: {
      keys: {
         0: 'xs',
         1: 'sm',
         2: 'md',
         3: 'lg',
         4: 'xl',
         5: "custom350",
         6: "custom1024",
         7: "custom1080",
         8: 'custom1100',
         9: 'custom1365',
      },
      values: {
         xs: 0,
         sm: 600,
         md: 960,
         lg: 1280,
         xl: 1920,
         custom350: 351,
         custom1024: 1025,
         custom1080: 1081,
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
         '100': '#2c2c2c',
         '200': '#5A5A5A',
         '300': '#E9E9E9',
         '400': '#C4C4C4',
         '500': '#8F8F8F',
      }
   },
   shadows: [ //вызываются theme.spacing[порядковый номер в этом массиве]
      'none',
      "0px 0px 20px rgba(0, 0, 0, 0.1)",
      "0px 0px 40px rgba(0, 0, 0, 0.1)",
      'none',
      'none',
      'none',
      'none',
      'none',
      '0px 0px 10px rgba(0, 0, 0, 0.3)', //используется выпадашки из селектов TextField
      'none',
      'none',
      'none',
      'none',
      'none',
      'none',
      'none',
      'none',
      'none',
      'none',
      'none',
      'none',
      'none',
      'none',
      'none',
      'none'
   ],
   typography: {
      h1: {

      },
      h2: {
         fontSize: '22px',
         fontWeight: 700,
      },
      h3: {
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
      MuiCssBaseline: {
         '@global': {
            width: '100%',
            height: '100%',
         }
      },
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
      MuiSelect: {
         root: {
            fontSize: '14px',
         },
      },
      MuiInputBase: {
         root: {
            fontSize: '14px',
         },
      },
      // MuiList: {
      //    root: {
      //       display: 'flex',
      //    }
      // },
      MuiAvatar: {
         root: {
            width: '100%',
            height: '100%',
         },
      },

      MuiButton: {
         root: {
            padding: '4px 16px',
         },
         contained: {
            boxShadow: 'none',
         },
      },
      MuiOutlinedInput: {
         input: {
            paddingTop: '8px',
            paddingRight: '16px',
            paddingBottom: '8px',
            paddingLeft: '16px',
         }
      }
   }
});

export default theme;