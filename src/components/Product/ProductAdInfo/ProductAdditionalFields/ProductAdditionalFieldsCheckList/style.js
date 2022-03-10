import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    item: {
        padding: '18px 0',
        display: 'flex',
    },
    itemTitle: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 400,
        color: '#8F8F8F',
        marginRight: '24px',
        minWidth: '160px',
        maxWidth: '160px',
    },
    listValue: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *:nth-of-type(even)': {
            marginRight: '0px'
        },
        '& > *:last-child': {
            marginBottom: '0px'
        }
    },
    itemValue: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 400,
        color: '#2C2C2C',
        width: '202px',
        marginBottom: '15px',
        marginRight: '24px'
    }
}));

export const useProductAdditionalFieldsCheckListStyles = () => useStyles();
