import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    note: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '15px',
        height: '24px',

        position: 'relative',

    },
    inputContainer: {
        transition: '.0s all linear',
        maxWidth: '154px',
        overflow: 'hidden',
        margin: '0 10px 0 2px',
    },
    inputContainerHide: {
        display: 'none'
    },
    input: {
        position: 'absolute',
        top: '0',
        left: '-155px',
        zIndex: '2',

        transition: '.15s all linear',
        // transform: 'translateX(154px)',
        '& > *:first-child': {
            '& > input': {
                width: '144px',
                padding: '3px 4px',
                height: '15px',
                borderRadius: '8px',
                border: '1px solid #8f8f8f',
                fontSize: '12px',
                background: '#fff',
            },
            '& > fieldset': {
                display: 'none'
            }
        }
    },
    activeInput: {
        transform: 'translateX(0)',
    },
    noteIcon: {
        width: '24px',
        height: '24px',
        cursor: 'pointer',
    }
}));

export const useProductCommentaryStyles = () => useStyles();
