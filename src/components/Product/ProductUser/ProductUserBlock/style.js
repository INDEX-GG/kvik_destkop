import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    userComplaint: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: '8px'
    },
    userComplaintText: {
        color: '#8F8F8F',
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: '14px',
        cursor: 'pointer',
        marginRight: '6px',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    userComplaintIcon: {
        width: '24px',
        height: '24px'
    }
}));

export const useProductUserBlockStyles = () => useStyles();
