import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    description: {
        color: '#2C2C2C',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '18px',
        marginTop: '18.5px',
        // paddingBottom: '18.5px',
        // borderTop: '1px solid #E9E9E9',
        wordWrap: 'break-word',
        // maxHeight: '54px',
        // overflow: 'hidden',
        order: '5',

        [theme.breakpoints.down(960)]: {
            borderTop: 'none',
        },
    },
    descriptionActive: {
        // maxHeight: '100%',
    }
}));

export const useProductDescriptionStyles = () => useStyles();
