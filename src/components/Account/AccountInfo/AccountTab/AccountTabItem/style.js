import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    tabItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '6px',
        marginLeft: '18px',
        transition: '.2s all linear',
        color: '#2C2C2C',
        fill: '#ffffff',
        '&:hover': {
            color: '#8F8F8F',
            fill: '#8F8F8F',
        }
    },
    tabActive: {
        color: '#00a0ab',
        fill: '#00a0ab'
    },
    tabIcon: {
        width: '24px',
        height: '24px',
        marginRight: '8px',
        '& > svg': {
            fill: 'inherit',
        }
    },
    tabTitle: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 500,
        color: 'inherit'
    },
    likeIcon: {
        stroke: '#2c2c2c'
    }
}));

export const useAccountTabItemStyles = () => useStyles();
