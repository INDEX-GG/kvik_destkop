import { Controller, useFormContext } from 'react-hook-form';
import { Box, Button, Checkbox, Collapse, FormControlLabel, makeStyles, Typography } from '@material-ui/core';
import OutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import Filledicon from '@material-ui/icons/Brightness1';
import DeliveryIcon from '../../../UI/icons/Delivery';
import {useState} from 'react';
import theme from '../../../UI/theme';

const useStyles = makeStyles((theme) => ({
    plaseOfferBox: {
        width: "100%",
        height: "48px",
        padding: "0 12px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    },
    plaseOfferBoxItem: {
        width: "100%",
        height: "48px",
        padding: "12px 0",
        display: "flex",
        justifyContent: "space-between",
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
        background: "url(/_next/static/media/delivery_grey.85dfdecca2284740743c76cee9e2e054.svg) left 15px no-repeat",
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
                        name='delivery'
                        control={methods.control}
                        defaultValue={false}
                        render={({ field: { onChange, value }}) => (
                            <FormControlLabel
                            className={classes.label}
                            control={
                            <Checkbox
                                    className={classes.check}
                                    color='primary'
                                    icon={<OutlinedIcon/>}
                                    checkedIcon={<Filledicon/>}
                                    checked={value}
                                    onChange={(e) => onChange(e.target.checked)}
                            />}
                            label="Доставка"
                        />
                        )}
                    />
                    <div className={classes.plaseOfferMore} onClick={() => setCollapsed(!collapsed)}>Подробнее</div>
                </Box>
                <Collapse in={collapsed}>
                    <Box>
                        <div className={classes.card_secure}></div>
                        <div className={classes.plaseOfferDeal}>Доставка</div>
                        <Typography className={classes.plaseOfferDesc}>
                            Текст
                        </Typography>
                        <Typography className={classes.plaseOfferDesc}>
                            Текст
                        </Typography>
                    </Box>
                </Collapse>
           </>
    )
}