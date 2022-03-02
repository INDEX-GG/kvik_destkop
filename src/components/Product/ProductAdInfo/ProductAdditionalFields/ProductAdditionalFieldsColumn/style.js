import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    additionalFieldList: {
        marginTop: '18px',
        // paddingBottom: '18px',
        borderBottom: '1px solid #E9E9E9',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        order: '4',
    },
    additionalFieldItem: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '297px',
        marginBottom: '18px',

        [theme.breakpoints.down(450)]: {
            width: '100%',
        }
    },
    additionalFieldItemSolo: {
        width: 'auto'
    },
    additionalFieldTitle: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: '400',
        color: '#8F8F8F',
        marginRight: '10px'
    },
    additionalFieldValue: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 400,
        color: '#2C2C2C',
        wordWrap: 'break-word',
        maxWidth: '190px',
        textAlign: 'right',
    }
}));

export const useProductAdditionalFieldsColumnStyles = () => useStyles();
