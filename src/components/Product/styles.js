import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    productHeader: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: '18px',
        width: '100%'
    },
    productUser: {
        textAlign: 'center',
        position: 'sticky',
        top: '105px',
    },
    productTitle: {
        marginBottom: '18px',
    },
    productCounts: {
        marginBottom: '18px',
    }
}));

export const useProductPageStyles = () => useStyles();
