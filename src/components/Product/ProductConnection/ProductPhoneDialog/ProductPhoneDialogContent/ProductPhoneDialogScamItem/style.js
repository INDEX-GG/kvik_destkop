import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    warningItem: {
        marginBottom: "20px",
        fontSize: '12px',
        fontWeight: 500,
        color: '#5A5A5A',
        lineHeight: '14px'
    },
}));

export const useProductPhoneDialogScamItemStyles = () => useStyles();
