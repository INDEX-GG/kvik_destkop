import {makeStyles} from "@material-ui/core";

export const useAccountTabItemStyles = makeStyles({
    tabItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '6px',
        marginLeft: '18px',
        transition: '.2s all linear',
        color: '#2C2C2C',
        fill: '#ffffff',
        cursor: 'pointer',
        '&:hover': {
            color: '#8F8F8F',
            fill: '#8F8F8F',
            '& span:first-child': {
                background: (props) => `url(/icons/accountTab/${props.hover})`,
            }
        },

        '& span:first-child': {
            background: (props) => `url(/icons/accountTab/${props.default})`,
            width: '24px',
            height: '24px',
            marginRight: '8px',
            '& > svg': {
                fill: 'inherit',
            },
        },
        '& span:first-child:hover': {
            background: (props) => `url(/icons/accountTab/${props.hover})`,
        }
    },
    tabItemActive: {
        color: '#00a0ab',
        fill: '#00a0ab'
    },
    tabIconActive: {
        background: (props) => `url(/icons/accountTab/${props.active}) !important`,
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
});
