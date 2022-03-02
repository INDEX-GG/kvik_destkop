import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    price: {
        // padding: '0 16px',
        paddingBottom: '6px',
        fontSize: '24px',
        fontWeight: '700',
        lineHeight: '1.17',
        color: 'rgba(44, 44, 44, 1)',

        [theme.breakpoints.down(960)]: {
            fontSize: '22px',
        },
    },
}));

export const useProductPriceStyles = () => useStyles();
