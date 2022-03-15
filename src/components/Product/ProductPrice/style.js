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
            // fontSize: '22px',
        },
    },
    priceTrade: {
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '16px',
        textAlign: 'center',
        color: '#2a2a2a',

        height: '16px',
        marginBottom: '6px',

        [theme.breakpoints.down(960)]: {
            display: 'none',
            marginBottom: '0',
        },

        [theme.breakpoints.down(400)]: {
            fontSize: '12px',
        },
    },
    opacityWeight: {
        fontWeight: '400',
    },
    opacityPrice: {
        opacity: '0.5',
    }
}));

export const useProductPriceStyles = () => useStyles();
