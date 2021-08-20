import { Controller, useFormContext } from 'react-hook-form';
import { Box, Checkbox, Collapse, FormControlLabel, makeStyles, Typography } from '@material-ui/core';
import OutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import Filledicon from '@material-ui/icons/Brightness1';
import {useState} from 'react';

const useStyles = makeStyles(() => ({
    plaseOfferBox: {
        width: "100%",
        height: "48px",
        padding: "0 12px",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    },
    plaseOfferBoxItem: {
        width: "100%",
        height: "48px",
        padding: "12px 0",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#ffff",
        alignItems: "center",
    },
    plaseOfferMore: {
        color: "#00A0AB",
        cursor: "pointer",
         transition: "0.2s all linear",
        "&:hover": {
            textDecoration: "underline"
        }
    },
    plaseOfferDeal: {
        color: "#2C2C2C",
        position: "relative",
        height: "36px",
        paddingTop: "20px",
        paddingLeft: "84px",
        background: "url(/_next/static/media/defense_grey.a076972ac9bca51efa264f2770e07496.svg) left 15px no-repeat",
        "&:before": {
            content: "''",
            position: "absolute",
            left: "60px",
            backgroundColor: "#00A0AB",
            width: "16px",
            borderRadius: "50%",
            border: "1px solid black",
            height: "16px"
        }
    },
    plaseOfferDesc: {
        fontSize: "12px",
        margin: "12px 0px",
        "&:nth-of-type(1)": {
            color: "#5A5A5A"
        },
        "&:nth-of-type(2)": {
            color: "#8F8F8F"
        }
    }
 }));

export default function MobileSafeDeal() {
    const [collapsed, setCollapsed] = useState(false);
    const classes = useStyles();
    const methods = useFormContext();

    return (
        <>
            <Box className={classes.plaseOfferBoxItem}>
                <Controller
                        name='safedeal'
                        control={methods.control}
                        defaultValue={false}
                        render={({ field: { onChange, value }}) => (
                            <FormControlLabel
                            control={
                                <Checkbox
                                        color='primary'
                                        icon={<OutlinedIcon/>}
                                        checkedIcon={<Filledicon/>}
                                        checked={value}
                                        onChange={(e) => onChange(e.target.checked)}
                                />}
                            label="Безопасная сделка"
                        />
                        )}
                />
                <div className={classes.plaseOfferMore} onClick={() => setCollapsed(!collapsed)}>Подробнее</div>
            </Box>
            <Collapse in={collapsed}>
                <Box>
                    <div className={classes.card_secure}></div>
                    <div className={classes.plaseOfferDeal}>Безопасная сделка</div>
                    <Typography className={classes.plaseOfferDesc}>
                        Безопасная сделка — это простой и надежный способ покупать и продавать товары по всей России Безопасная сделка — это простой и надежный способ покупать и продавать товары по всей России Безопасная сделка — это простой и надежный способ покупать и продавать товары по всей России
                    </Typography>
                    <Typography className={classes.plaseOfferDesc}>
                        При оплате онлайн сразу вернем деньги, если товар не устроит. При оплате онлайн доставка от 374.70 ₽ и 1 рабочего дня При оплате онлайн сразу вернем деньги, если товар не устроит. При оплате онлайн доставка от 374.70 ₽ и 1 рабочего дня При оплате онлайн сразу вернем деньги, если товар не устроит. При оплате онлайн доставка от 374.70 ₽ и 1 рабочего дня
                    </Typography>
                </Box>
            </Collapse>
        </>
    )
}