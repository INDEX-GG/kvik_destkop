import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        margin: '0px',
        background: 'no-repeat center/100% url(/img/logoBackground.png)',
        backgroundPosition: 'center top',
        height: '700px',
        display: 'flex',
        flexDirection: 'column',

        [theme.breakpoints.between(960,1025)]: {
            background: 'no-repeat center/86% url(/img/logoBackground.png)',
        },
        [theme.breakpoints.down(960)]: {
            padding: '0px 16px 16px 16px',
            backgroundImage: 'none',
            height: '100%',
            background: 'none',
        },
        [theme.breakpoints.up(1281)]: {
            margin: '0px 80px',
            background: 'no-repeat center/96% url(/img/logoBackground.png)',
        },
       
       
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        [theme.breakpoints.down(600)]: {
            margin: '20px 0px 0px',
        },
        [theme.breakpoints.between(600, 800)]: {
            fontSize: '30px',
            margin: '15px 0px'
        },
        [theme.breakpoints.between(800, 960)]: {
            fontSize: '36px',
            margin: '25px 0px'
        },
        [theme.breakpoints.up(960)]: {
            fontSize: '36px',
            margin: '25px 0px'
        },
        [theme.breakpoints.up(1025)]: {
            fontSize: '36px',
            margin: '0px 0px 25px'
        },
    },
    balance: {
        // fontSize: '36px',
        fontWeight: 700,
        lineHeight: '42.19px',
        display: 'flex',
        alignItems: 'center',
        margin: '20px 0px',
        color: '#00A0AB',
        
        [theme.breakpoints.down(600)]: {
            fontSize: '25px',
            lineHeight: '29px',
            // marginBottom: '20px'
            margin: '10px 0px 20px',
        },
        
    },

    containerMore: {
        order: 'none',
        width: '100%',
        textAlign: 'center',

        [theme.breakpoints.down(960)]: {
            order: '3',
            width: '100%',
            display: 'flex',
            flexDirection: 'row-reverse',
        },

    },
    more: {
        color: '#8F8F8F',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '16px',

        [theme.breakpoints.down(300)]: {
            fontSize: '12px',
        },
        [theme.breakpoints.between(600, 800)]: {
            fontSize: '16px',
            lineHeight: '18px',
        },
        [theme.breakpoints.between(800, 960)]: {
            fontSize: '18px',
            lineHeight: '20px',
        },
    },
    icon: {
        width: '33px',
        height: '33px',

        [theme.breakpoints.down(600)]: {
            width: '23px',
            height: '23px',
        },

    },
    containerTextField:{ 
        width: '100%',
    },
    textField:{
        width: '100%',
        color: 'red',
        borderBottom: 'none ',
        
    },
    textField__label:{ 
        fontFamily: 'Roboto',
        // fontSize: '15px',
        
    },

    button: {
        // marginBottom: '20px',
    },
    wrappButton: {
        padding: '10px',
    },
    balanceAdd: {
        width: '14px',
        marginRight: '10px',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: '-2px',
            width: '14px',
            height: '3px',
            backgroundColor: '#FFFFFF',
            transform: 'rotate(90deg)',
            borderRadius: '10px'
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: '-2px',
            width: '14px',
            height: '3px',
            backgroundColor: '#FFFFFF',
            borderRadius: '10px'
        }
    },

//Блок с данными
    hints: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',

        '& > *:nth-of-type(2n)': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
        },
        [theme.breakpoints.down(960)]: {
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            '& > *:nth-of-type(2n)': {
                display: 'block',
            },
            '& > *:nth-of-type(1n)': {
                borderBottom: '2px solid #A1DCE0',
                width: '100%'
            },
            '& > *:last-child': {
                borderBottom: 'none',
            },
        },
        [theme.breakpoints.between(960,1025)]: {
            padding: '0 100px 0px 110px',
        },
        [theme.breakpoints.between(1025,1081)]: {
            padding: '0px 0px 0px 55px',
        },
        [theme.breakpoints.between(1081, 1281)]: {
            padding: '0px 10px 0px 55px',
        },
        [theme.breakpoints.up(1281)]: {
            padding: '0px 40px 0px 80px',
        },
        
    },
// Поле ввода
    textField: {    
        backgroundColor: '#dbdbdb',
        borderRadius: '8px',
        width: '323px',
        marginBottom: '20px',
        '& > .MuiInputBase-root': {
        '& > .MuiOutlinedInput-input': {
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: '700',
            lineHeight: '23.44px',
            height: '50px',
            padding: '0px'
        },
        '& > .MuiOutlinedInput-input:focus': {
            fontSize: '20px',
            fontWeight: '700',
        },
        '& > .MuiOutlinedInput-input:focus::placeholder': {
            color: '#dbdbdb'
        },
        '& > .MuiOutlinedInput-input::placeholder': {
            fontSize: '15px',
        },
        '& > .PrivateNotchedOutline-root-32': {
            border: 'none'
        },
        '& > .Mui-focused': {
            border: 'none',
            fontSize: '15px',
            color: 'none',
        },
    },
        
}

}));

export const useBalanceStyles = () => useStyles();
