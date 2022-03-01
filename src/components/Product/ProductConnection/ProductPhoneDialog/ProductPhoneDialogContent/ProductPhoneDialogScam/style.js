import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    warningMessage: {
        marginBottom: "15px",
        fontSize: '12px',
        fontWeight: "500",
        color: "#5A5A5A",
    },
    scamList: {
        '& > *:last-child': {
            marginBottom: 0
        }
    }
}));

export const useProductPhoneDialogScamStyles = () => useStyles();
