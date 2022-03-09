import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    button: {
        marginBottom: '24px',

        [theme.breakpoints.down(960)]: {
            marginBottom: '10px',
        },
    },
    buttonRoot: {
        paddingTop: '4px',
        paddingBottom: '4px'
    },
    myButtonRoot: {
        backgroundColor: '#E9E9E9',
        // backgroundColor: '#C7C7C7',
        color: '#2C2C2C',
        // color: '#FFF',
        '&:hover': {
            backgroundColor: '#d9d9d9'
        }
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonIcon: {
        width: '24px',
        height: '24px',
        marginRight: '8px'
    },
}));

export const useProductConnectionButtonStyles = () => useStyles();
