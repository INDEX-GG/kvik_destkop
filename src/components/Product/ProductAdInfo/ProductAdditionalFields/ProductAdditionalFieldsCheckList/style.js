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
            textAlign: 'left',
            width: 'auto',

            '& > *:nth-child(n)': {
                marginRight: '10px',
            },
            '& > *:nth-child(3n + 3)': {
                marginRight: '0px',
            }
        },

        [theme.breakpoints.down(605)]: {
            '& > *:nth-child(n)': {
                marginRight: '10px',
            },
            '& > *:nth-child(2n)': {
                marginRight: '0px',
            }
        },

        [theme.breakpoints.down(450)]: {
            textAlign: 'end',
            width: 'auto',

            '& > *:nth-child(n)': {
                marginRight: '0px',
            },
        },

        [theme.breakpoints.down(400)]: {
            width: '51%',
        },

    },
    itemValue: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 400,
        color: '#2C2C2C',
        width: '201px',
        minWidth: '157px',
        marginBottom: '15px',
        // marginRight: '24px',

        [theme.breakpoints.down(960)]: {
            width: '25%',
            minWidth: '115px',
        },

        [theme.breakpoints.down(790)]: {
            width: '30%',
            minWidth: '115px',
        },

        [theme.breakpoints.down(605)]: {
            width: '40%',
        },

        [theme.breakpoints.down(450)]: {
            width: '100%',
            // marginRight: '9px !important',
        },

        [theme.breakpoints.down(350)]: {
            width: '100%',
            marginRight: '0 !important',
            // minWidth: '120px',
        }
    }
}));

export const useProductAdditionalFieldsCheckListStyles = () => useStyles();
