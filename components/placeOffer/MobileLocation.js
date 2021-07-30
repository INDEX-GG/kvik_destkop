import { Controller, useFormContext } from 'react-hook-form';
import { Box, Button, Collapse, makeStyles, TextField, Typography } from '@material-ui/core';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
   plaseOfferBox: {
        width: "100%",
        padding: "0 12px",
        backgroundColor: "#ffff",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        marginBottom: "32px"
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
   map: {
       height: '400px',
       borderRadius: theme.shape.borderRadius,
       marginTop: "32px"
   },
   plaseOfferTitle: {
      fontSize: "14px"
   },
   placeOfferMapBox: {
      position: "relative"
   },
   placeOfferMapDesc: {
      color: "#C7C7C7",
      fontSize: "12px",
      position: "absolute",
      top: "40px"
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

export default function MobileLocation() {
   const [collapsed, setCollapsed] = useState(false)
   const classes = useStyles();
   const methods = useFormContext();

   return (
      <Box className={classes.plaseOfferBox}>
         <Box className={classes.plaseOfferBoxItem}>
            <Typography className={classes.plaseOfferTitle}>Местоположение</Typography>
            <div className={`${classes.plaseOfferMore} ${collapsed ? classes.placeOfferMoreActive : ""}`} onClick={() => setCollapsed(!collapsed)}>Город, автоматически определенный</div>
         </Box>
         <Collapse in={collapsed}>
            <Box className={classes.placeOfferMapBox}>
               <Controller
                  name="location"
                  control={methods.control}
                  defaultValue=''
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                     <TextField
                        variant='outlined'
                        type="text"
                        fullWidth
                        autoComplete="on"
                        value={value}
                        onChange={onChange}
                        error={!!error} helperText={error ? error.message : ' '} />
                  )}
                  rules={{ required: 'Укажите ваше местоположение...' }}
               />
               <p className={classes.placeOfferMapDesc}>Введите название и выберете из списка населенный пункт и улицу</p>
               <iframe className={classes.map} src="https://yandex.ru/map-widget/v1/?um=constructor%3Ade278bb067489a15a031480c20e3318914d391acd3e1995348d759fa5baa2167&amp;source=constructor" width="100%" height="100%" frameBorder="0"></iframe>
            </Box>
            <Button className={classes.buttonSend} color='primary' variant='contained'>Сохранить</Button>
         </Collapse>
      </Box>
   )
}
