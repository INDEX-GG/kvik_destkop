import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    modalClassesContainer: {
        position: 'relative',
        '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: '0',
            zIndex: -1,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(3, 3, 3, 0.65);',
        }
    },
    modalPaper: {
        overflow: 'visible'
    },
    modalContainer: {
        overflowY: 'scroll',
        overflowX: 'hidden',
        [theme.breakpoints.down(960)]: {
            padding: '0 10px 15px',
            height: '100%',
        }
    },
    closeIcon: {
        cursor: 'pointer',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            right: '-40px',
            top: 0,
            width: '30px',
            height: '4px',
            backgroundColor: '#c7c7c7',
            borderRadius: '10px',
            transform: 'rotate(45deg)'
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            right: '-40px',
            top: 0,
            width: '30px',
            height: '4px',
            backgroundColor: '#c7c7c7',
            borderRadius: '10px',
            transform: 'rotate(-45deg)'
        },
        [theme.breakpoints.down(990)]: {
            '&:after': {
                width: '20px',
                right: '-30px',
            },
            '&:before': {
                width: '20px',
                right: '-30px',
            },
        }
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '64px',
        background: '#FFFFFF',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        position: 'relative',
    },
    modalHeaderIcon: {
        position: 'absolute',
        left: '18px',
        top: '50%',
        transform: 'translateY(-50%)'
    },
    modalHeaderTitle: {
        fontSize: '18px',
        fontWeight: 500,
        lineHeight: '21.09px',
        textAlign: 'center',
    },
    modalHeaderSubtitle: {
        fontSize: '12px',
        lineHeight: '14.06px',
        color: '#8F8F8F',
        textAlign: 'center',
    },
    modalHeaderArrow: {
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            left: '0',
            top: '3px',
            width: '15px',
            height: '2.5px',
            backgroundColor: '#c7c7c7',
            borderRadius: '10px',
            transform: 'rotate(45deg)'
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            left: '0',
            top: '-6.5px',
            width: '15px',
            height: '2.5px',
            backgroundColor: '#c7c7c7',
            borderRadius: '10px',
            transform: 'rotate(-45deg)'
        }
    },
    modalHeaderOptionalElement: {
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)'
    }
}));

export const useCustomModalUIStyles = () => useStyles();
