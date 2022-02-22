import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    description: {
        color: '#2C2C2C',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '18px',
        marginTop: '18.5px',
        paddingBottom: '41.5px',
        borderBottom: '1px solid #E9E9E9'
    },
}));

export const useProductDescriptionStyles = () => useStyles();
