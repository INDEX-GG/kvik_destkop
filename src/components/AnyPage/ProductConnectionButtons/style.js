import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    button: {
      marginBottom: '24px'
    },
    buttonRoot: {
        paddingTop: '4px',
        paddingBottom: '4px'
    },
    myButtonRoot: {
        backgroundColor: '#E9E9E9',
        color: '#2C2C2C',
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
