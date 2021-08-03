import React from "react"
import { Box, makeStyles, InputBase, TextField } from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"
import MobilePhotoes from "./MobilePhotoes";

const useStyles = makeStyles((theme) => ({
    plaseOfferInput: {
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        width: "100%",
        height: "48px",
        border: "0",
        paddingLeft: "11px",
        paddingTop: "9px",
        marginBottom: "32px",
        border: 0,
        outline: 0
    }
}));



export default function MobileProduct({ctx}) {

    const classes = useStyles();
    const methods = useFormContext();
    let photoes = [];
    const photoesCtx = (obj) => {
        return photoes = obj;
    }

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
                     className={classes.plaseOfferInput}
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
                     placeholder="Введите описание товара (до 4 000 символов)"
                     className={classes.plaseOfferInput}
                     type="text"
                     autoComplete="on"
                     value={value}
                     onChange={onChange}
                     error={!!error} helperText={error ? error.message : ' '} 
                     InputProps={{
                        disableUnderline: true
                     }} />
               )}
               rules={{ required: `Опишите ${methods.watch('title')}` }}
            />
        </Box>
    )
}