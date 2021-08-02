import { Controller, useFormContext } from 'react-hook-form';
import { Box, Button, Collapse, makeStyles, TextField, Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import OutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import Filledicon from '@material-ui/icons/Brightness1';
import { useState, useEffect } from 'react';
import { MenuItem } from '@material-ui/core';
import { useUser } from '../../hooks/useUser';
import { phoneNumber } from '../../lib/services'

const useStyles = makeStyles((theme) => ({
   plaseOfferBox: {
        width: "100%",
        padding: "0 12px",
        backgroundColor: "#ffff",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    },
    plaseOfferBoxItem: {
        width: "100%",
        height: "48px",
        padding: "12px 0",
        display: "flex",
        alignItems: "center",
        "&:nth-of-type(1)": {
            justifyContent: "space-between",
            borderBottom: "1px solid #E9E9E9"
        },
        "&:nth-of-type(2)": {
            justifyContent: "flex-end"
        }
    },
   plaseOfferMore: {
      color: "#00A0AB",
      paddingRight: "20px",
      position: "relative",
      cursor: "pointer",
      "&:before": {
         content: "''",
         backgroundColor: "#C7C7C7",
         width: "10px",
         height: "2px",
         position: "absolute",
         right: "0px",
         top: "3px",
         transform: "rotate(45deg)",
         borderRadius: "10px"
      },
      "&:after": {
         content: "''",
         backgroundColor: "#C7C7C7",
         width: "10px",
         height: "2px",
         position: "absolute",
         right: "0px",
         top: "9px",
         transform: "rotate(-45deg)",
         borderRadius: "10px"
      }
   },
   placeOfferMoreActive: {
      "&:before": {
         content: "' '",
         transform: "rotate(50deg)",
         top: "5px",
         right: "5.9px"
      },
      "&:after": {
         content: "' '",
         top: "5px",
         right: "0",
         transform: "rotate(130deg)"
      }
   },
   buttonSend: {
        position: "absolut",
        left: "50%",
        width: "100%",
        maxWidth: "460px",
        margin: "32px 0px",
        height: "32px",
        transform: "translateX(-50%)",
        marginTop: "104px"
   },
}));

export default function MobileContact() {
   const classes = useStyles();
   const methods = useFormContext();
   const [collapsed, setCollapsed] = useState(false)
   const {phone, isLoading} = useUser(); 
	const [phones, setPhones] = useState([]);
	const [defaultVal, setDefaultVal] = useState({});

   useEffect(() => {
      setPhones([{value: phone, label: phoneNumber(phone)}]);
   }, [phone, isLoading])

   useEffect(() => {
      if (phones.length > 0) {
         setDefaultVal(phones[0].value);
      }
   }, [phones])

   useEffect(() => {
      if (defaultVal) {
         methods.setValue('contact', defaultVal)
      }
   }, [defaultVal])


   return (
      <Box className={classes.plaseOfferBox}>
         <Box className={classes.plaseOfferBoxItem}>
            <Typography className={classes.plaseOfferTitle}>Контакты</Typography>
            <div className={`${classes.plaseOfferMore} ${collapsed ? classes.placeOfferMoreActive : ""}`} onClick={() => setCollapsed(!collapsed)}>+7 (000) 000 - 00 - 00</div>
         </Box>
         <Box className={classes.plaseOfferBoxItem}>
             <Controller
                    name='bymessages'
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
                        label="Сообщения"
                    />
                    )}
                    rules={{ required: !(methods.watch('bymessages') || methods.watch('byphone')) ? 'Выбирите способ для обратной связи' : null }}
                />
                <Controller
                    name='byphone'
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
                        label="Телефон"
                    />
                    )}
                    rules={{ required: !(methods.watch('bymessages') || methods.watch('byphone')) ? 'Выбирите способ для обратной связи' : null }}
                />
         </Box>
         <Collapse in={collapsed}>
            <Box className={classes.placeOfferMapBox}>
               <Controller
                name="contact"
				    defaultValue=""
                control={methods.control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                        select
                        fullWidth
                        className={classes.input}
                        variant='outlined'
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : ' '}>
                        {phones.map((option, i) => (
                            <MenuItem key={i} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
                rules={{ required: 'Выбирите номер для связи' }}
            />
            </Box>
            <Button onClick={() => setCollapsed(!collapsed)} className={classes.buttonSend} color='primary' variant='contained'>Сохранить</Button>
         </Collapse>
      </Box>
   )
}
