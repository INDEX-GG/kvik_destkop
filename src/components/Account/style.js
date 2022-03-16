import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    accountContainer: {
        margin: '73px 0',
        display: 'flex',
        // backgroundColor: 'red',
        // border: '1px solid red',
    },
    mainContainer: {
        // border: '1px solid blue',
        width: '100%',
        // gridArea: '2 / 3 / 4 / 4',
        // paddingBottom: '32px',
        borderRadius: '10px',
        boxShadow: '0 0 20px #0000001a',
        transition: 'all 350ms ease-in-out',
        background: '$fff',
        marginLeft: '24px',
    }
}));

export const useAccountPageStyles = () => useStyles();
