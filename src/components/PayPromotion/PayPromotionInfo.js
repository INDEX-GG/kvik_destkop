import React, {useMemo} from 'react';
import {Box, makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import KvikPayIcon from "../../UI/UIicon/KvikPayIcon";
import KvikButton from "../../UI/UIcomponent/KvikButton";
import {getTrueItemInObj, sumArray} from "../../services/services";

const getTotalBonus = (sum) => {
    return Math.round(sum / 10) * 10
}


const PayPromotionInfo = ({watchForm}) => {

    const classes = useStyles();
    const selectItemLength = useMemo(() => getTrueItemInObj(watchForm), [watchForm])
    const totalPrice = sumArray(selectItemLength, 'value')
    const totalBonus = getTotalBonus(totalPrice) * 2;

    return (
        <Box className={classes.payInfo}>
            <Box className={classes.payPrice}>
                Итого {totalPrice} ₽/ {totalBonus}
                <Box className={classes.payIcon} component='span'>
                    <KvikPayIcon/>
                </Box>
            </Box>
            <Box className={classes.balanceInfo}>
                <Box className={classes.payCheck}>
                    На вашем счете:&nbsp;
                    <Box className={classes.payBalance} component='span'>
                        100 ₽ / 150 &nbsp;<Box className={classes.payBalanceIcon}><KvikPayIcon/></Box>&nbsp;
                    </Box>
                </Box>
                <Button classes={{root: classes.payAddBalance}}>
                    Пополнить
                </Button>
            </Box>
            <KvikButton disabled={!selectItemLength?.length} type='submit'>
                Продоложить
            </KvikButton>
        </Box>
    );
};


const useStyles = makeStyles(() => ({
    payInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    payPrice: {
        fontSize: '24px',
        lineHeight: '28.13px',
        color: '#00A0AB',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center'
    },
    payIcon: {
        width: '24px',
        height: '24px',
        marginLeft: '3px'
    },
    balanceInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    payCheck: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px',
        lineHeight: '16.41px',
        color: '#2C2C2C',
        fontWeight: 500,
    },
    payBalance: {
        color: '#00A0AB',
        fontSize: '18px',
        lineHeight: '21px',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center'
    },
    payBalanceIcon: {
        width: '16px',
        height: '16px'
    },
    payAddBalance: {
        color: '#8F8F8F',
        fontSize: '10px',
        lineHeight: '12px',
        fontWeight: 500,
        padding: '4px 6px',
        maxWidth: '55px',
        margin: '0 auto'
    },
}));

export default React.memo(PayPromotionInfo);
