import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    item: {
        padding: '18px 0',
        display: 'flex',

        [theme.breakpoints.down(350)]: {
            justifyContent: 'space-between',
        }
    },
    itemTitle: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 400,
        color: '#8F8F8F',
        marginRight: '24px',
        minWidth: '160px',
        maxWidth: '160px',

        [theme.breakpoints.down(350)]: {
            minWidth: '114px ',
        }
    },
    listValue: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *:nth-of-type(even)': {
            marginRight: '0px'
        },
        '& > *:last-child': {
            marginBottom: '0px'
        },

        [theme.breakpoints.down(960)]: {
            textAlign: 'end',
            width: 'auto'

        },

        [theme.breakpoints.down(400)]: {
            width: '49%',
        },

    },
    itemValue: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 400,
        color: '#2C2C2C',
        width: '202px',
        minWidth: '157px',
        marginBottom: '15px',
        // marginRight: '24px',

        [theme.breakpoints.down(960)]: {
            width: '100%',
            minWidth: '120px',
        },

        [theme.breakpoints.down(420)]: {
            width: '202px   ',
            marginRight: '9px !important',
        },

        [theme.breakpoints.down(350)]: {
            width: '100%',
            marginRight: '0 !important',
            // minWidth: '120px',
        }
    }
}));

export const useProductAdditionalFieldsCheckListStyles = () => useStyles();
