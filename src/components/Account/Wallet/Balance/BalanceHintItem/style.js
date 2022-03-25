import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    hintItem: {
        width: '50%',

        [theme.breakpoints.down(960)]: {
            width: '100%',
            marginBottom: '0px',
        },
        [theme.breakpoints.between(960, 1205)]: {
            marginBottom: '20px',
        },
        [theme.breakpoints.between(1025, 1281)]: {
            marginBottom: '0px',
        },
        [theme.breakpoints.up(1281)]: {
            marginBottom: '20px',
        },
    },
    hintContainer: {
        // minWidth: '282px',
        [theme.breakpoints.down(600)]: {
            minWidth: '250px',
        },
        [theme.breakpoints.between(960, 1025)]: {
            maxWidth: '290px',
        },
        [theme.breakpoints.up(1025)]: {
            maxWidth: '282px',
        },
    },
    title: {
        color: '#00A0AB',
        // fontSize: '25px',
        // lineHeight: '29.3px',
        fontWeight: 900,
        margin: '25px 0px 20px ',
        lineHeight: '100%',
        // marginBottom: '5px',
        // whiteSpace: 'pre-line',
        [theme.breakpoints.down(300)]: {
            fontSize: '14px',
        },
        [theme.breakpoints.between(300,600)]: {
            fontSize: '18px',
        },
        [theme.breakpoints.between(600, 800)]: {
            fontSize: '22px',
        },
        [theme.breakpoints.up(800)]: {
            fontSize: '25px', 
        },
        

    },
    subtitle: {
        color: '#000000',
        fontWeight: 400,
        fontSize: '14px',
        margin: '-10px 0px 15px 0px ',
        // lineHeight: '16.41px',
        // whiteSpace: 'pre-line',

        [theme.breakpoints.down(300)]: {
            fontSize: '12px',
            lineHeight: '100%',
        },
        [theme.breakpoints.between(600, 800)]: {
            fontSize: '16px',
            lineHeight: '18px',
        },
        [theme.breakpoints.between(800, 960)]: {
            fontSize: '18px',
            lineHeight: '20px',
        },
        [theme.breakpoints.between(960, 1025)]: {
            fontSize: '16px',
            lineHeight: '18px',
        },
    }
}));


export const useBalanceHintItemStyles = () => useStyles();
