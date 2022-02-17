import React, {useMemo} from 'react';
import {Box} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import KvikPayIcon from "../../../UI/UIicon/KvikPayIcon";
import KvikButton from "../../../UI/UIcomponent/KvikButtonUI";
import {getTrueItemInObj, sumArray} from "../../../services/services";
import {usePayPromotionInfoStyles} from "./style";

const getTotalBonus = (sum) => {
    return Math.round(sum / 10) * 10
}


const PayPromotionInfo = ({watchForm}) => {

    const classes = usePayPromotionInfoStyles();
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
            <KvikButton
                customRoot={classes.confirmButton}
                disabled={!selectItemLength?.length}
                type='submit'
            >
                Продоложить
            </KvikButton>
        </Box>
    );
};

export default React.memo(PayPromotionInfo);
