import React from 'react';
import {Box, makeStyles} from "@material-ui/core";
import CustomCheckboxUI from "../../UI/CustomCheckboxUI";

const PayPromotionItem = ({active, formValues, reset, promotion}) => {

    const classes = useStyles();
    const {img, title, subtitle, value, name} = promotion

    const handleChangeActive = async () => {
        if (name === 'none') return reset({none: formValues?.none ? undefined : promotion});
        if (name === 'combo') return reset({combo: formValues?.combo ? undefined : promotion});
        if (active) await reset({...formValues, [name]: undefined})
        if (!active) await reset({...formValues, [name]: promotion, combo: undefined, none: undefined})
    }


    return (
        <Box
            onClick={handleChangeActive}
            className={`${classes.item} ${active ? classes.itemActive : ''}`}
        >
            <Box className={classes.imgContainer}>
                {img && (
                    <img
                        className={classes.img}
                        src={img}
                        alt='promotion-img'
                    />
                )}
            </Box>
            <Box className={classes.text}>
                <Box className={classes.top}>
                    <Box className={classes.name}>
                        <CustomCheckboxUI checked={!!active}/>
                        <Box className={classes.itemTitle}>{title}</Box>
                    </Box>
                    {value && <Box className={classes.price}>{value} ₽</Box>}
                </Box>
                {subtitle && <Box className={classes.itemSubtitle}>{subtitle}</Box>}
            </Box>
        </Box>
    );
};

const useStyles = makeStyles(() => ({
    item: {
        cursor: 'pointer',
        padding: '14px 25px',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        borderRadius: '8px',
        transition: '.2s all linear',
    },
    itemActive: {
        transition: '.2s all linear',
        backgroundColor: 'rgba(208, 237, 239, 0.15)',
        position: 'relative',
        '&::after': {
            transition: '.2s all linear',
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 0,
            width: '100%',
            height: '100%',
            border: '1px solid #00A0AB',
            borderRadius: '8px',
        }
    },
    img: {
        width: '100%',
        height: '96px',
    },
    imgContainer: {
        width: '104px',
        marginRight: '30px'
    },
    text: {
        flexGrow: 1,
},
    top: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '9px'
    },
    name: {
        display: 'flex',
        alignItems: 'center'
    },
    itemTitle: {
        fontSize: '18px',
        fontWeight: 500,
        color: '#2C2C2C',
        lineHeight: '21.09px',
    },
    itemSubtitle: {
        whiteSpace: 'pre-line',
        fontSize: '14px',
        lineHeight: '16px',
        color: '#8F8F8F'
    },
    price: {
        fontSize: '18px',
        fontWeight: 500,
        lineHeight: '21px',
        color: '#00A0AB'
    }
}));

export default React.memo(PayPromotionItem);
