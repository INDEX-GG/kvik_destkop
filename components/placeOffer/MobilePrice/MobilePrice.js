import { Controller, useFormContext } from 'react-hook-form';
import { Box, Checkbox, FormControlLabel, makeStyles, TextField } from "@material-ui/core"
import OutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import Filledicon from '@material-ui/icons/Brightness1';
import { cursorReplace, priceFormat } from '../../../lib/priceFormat';
const useStyles = makeStyles(() => ({
    plaseOfferBox: {
        width: "100%",
        padding: "0 12px",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        marginBottom: "32px"
    },
    plaseOfferBoxItem: {
        width: "100%",
        height: "48px",
        padding: "12px 0",
        display: "flex",
        alignItems: "center",
    },
    plaseOfferPrice: {
        borderBottom: "1px solid #E9E9E9",
        justifyContent: "space-between"
    },
    plaseOfferPriceTitle: {
        color: "#5A5A5A"
    },
    plaseOfferPriceInput: {
        width: "100px",
        "& ::placeholder": {
            float: 'right',
        },
    },
    plaseOfferAuction: {
        justifyContent: "flex-end"
    },
    inputError4: {
        "& > p": {
            position: "absolute",
            bottom: "-10px",
            fontSize: "11px",
            // left: "-18px",
            width: "100px"
        }
    },
    label: {
        margin: '0',
    },
}))

export default function MobilePrice() {
    const methods = useFormContext();
    const classes = useStyles()

    return (
        <>
            <Box className={classes.plaseOfferBox}>
                <Box className={classes.plaseOfferBoxItem + " " + classes.plaseOfferPrice}>
                    <div className={classes.plaseOfferPriceTitle}>Цена, &#8381;</div>
                    <Controller
                        name="price"
                        control={methods.control}
                        defaultValue=''
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                className={`${classes.plaseOfferPriceInput} ${classes.inputError4}`}
                                placeholder="Ввести"
                                type="text"
                                autoComplete="on"
                                value={value}
                                onKeyDown={e => cursorReplace(e)}
                                onChange={e => onChange(priceFormat(e))}
                                error={!!error} helperText={error ? error.message : ' '}
                                InputProps={{
                                    disableUnderline: true
                                }} />
                        )}
                        rules={{ required: `Введите цену ${methods.watch('title') != undefined ? methods.watch('title') : null}`, max: 10 }}
                    />
                </Box>
                <Box className={classes.plaseOfferBoxItem + " " + classes.plaseOfferAuction}>
                    <Controller
                        name='trade'
                        control={methods.control}
                        defaultValue={false}
                        render={({ field: { onChange, value } }) => (
                            <FormControlLabel
                                className={classes.label}
                                control={
                                    <Checkbox
                                        className={classes.check}
                                        color='primary'
                                        icon={<OutlinedIcon />}
                                        checkedIcon={<Filledicon />}
                                        checked={value}
                                        onChange={(e) => onChange(e.target.checked)}
                                    />}
                                label="Торг"
                            />
                        )}
                    />
                </Box>
            </Box>
            <Box className={classes.plaseOfferBox}>
                {/* <MobileSafeDeal/>
                <MobileDelivery/> */}
            </Box>
        </>

    )
}