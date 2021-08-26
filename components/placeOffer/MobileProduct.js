import React from "react"
import { Box, makeStyles, TextField } from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"
import MobilePhotoes from "./MobilePhotoes";
import { useMedia } from "../../hooks/useMedia";

const useStyles = makeStyles(() => ({
    plaseOfferInput: {
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        width: "100%",
        height: "48px",
        paddingLeft: "11px",
        paddingTop: "9px",
        marginBottom: "32px",
        border: 0,
        outline: 0,
    },
    inputError1: {
        "& > p": {
            position: "absolute",
            bottom: "-22px"
        }
    },
    inputError3: {
        "& > p": {
            position: "absolute",
            bottom: "-20px"
        }
    }
}));



export default function MobileProduct({ctx}) {

    const classes = useStyles();
    const methods = useFormContext();
    const {matchesMobile} = useMedia()

    return (
        <Box>
            <Controller
               variant="standard"
               name="title"
               control={methods.control}
               defaultValue=''
               render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                     placeholder="Введите название товара"
                     className={`${classes.plaseOfferInput} ${classes.inputError1}`}
                     type="text"
                     autoComplete="on"
                     value={value}
                     onChange={onChange}
                     error={!!error} helperText={error ? error.message : ' '} 
                     InputProps={{
                        disableUnderline: true
                     }} />
               )}
               rules={{ required: 'Введите название Товара' }}
            />
            <MobilePhotoes ctx={ctx}/>
            <Controller
               name="description"
               control={methods.control}
               defaultValue=''
               render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                     placeholder={matchesMobile ? "Описание товара" : "Введите описание товара (до 4 000 символов)"}
                     className={`${classes.plaseOfferInput} ${classes.inputError3}`}
                     type="text"
                     autoComplete="on"
                     value={value}
                     onChange={onChange}
                     error={!!error} helperText={error ? error.message : ' '} 
                     InputProps={{
                        disableUnderline: true
                     }} />
               )}
               rules={{ required: `Опишите ${methods.watch('title') != undefined ? methods.watch('title') : null}` }}
            />
        </Box>
    )
}