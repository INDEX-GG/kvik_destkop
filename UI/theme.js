import { createMuiTheme } from '@material-ui/core';

        const theme = createMuiTheme({
            palette: {
               primary: {
                  main: '#00A0AB',
               },
               secondary: {
                  main: '#ffffff',
               },
               error: {
                   main: '#F44545',
               }
            },
            typography: {
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
                  },
               },
               MuiBox: {
                   root: {
                    display: 'flex',
                   },
               },
               MuiButton: {
                  root: {
                    
                  }
               }
            }
         });

export default theme;
