import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    tooltip: {
        border: "#8F8F8F solid 1px",
        background: "#FFFFFF",
        color: "#5A5A5A",
        fontSize: "12px",
        textAlign: 'center',
        maxWidth: '190px',
    },
    arrow: {
        color: '#FFFFFF',
        "&:before": {
            content: '""',
            border: "#8F8F8F solid 1px",
        }
    },
}));

export const useCustomTooltipUIStyles = () => useStyles();
