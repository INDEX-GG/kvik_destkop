import { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, Checkbox, FormControlLabel, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core';
import { useUser } from '../../hooks/useUser';
import OutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import Filledicon from '@material-ui/icons/Brightness1';
import { phoneNumber } from '../../lib/services';

const useStyles = makeStyles((theme) => ({
   formElem: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: theme.spacing(3),
   },
   formTitleField: {
      flexGrow: 1,
      padding: '4px 0',
   },
   formInputField: {
      width: '490px',
   },
   input: {
    width: '230px',
    },
    check: {
        padding: '6px',
     },
    label: {
        flexGrow: 1,
       marginLeft: theme.spacing(1),
       '& span': {
            fontSize: '14px',
       }
    },
}));

const Contacts = () => {
    const [phones, setPhones] = useState([]);
    const {phone, isLoading} = useUser(); 
    const classes = useStyles();
    const methods = useFormContext();

useEffect(() => {
    setPhones([{value: phone, label: phoneNumber(phone)}]) 
}, [isLoading])

   return (
      <Box className={classes.formElem}>
         <Typography className={classes.formTitleField}>Контакты</Typography>
         <Box className={classes.formInputField}>
         <Controller
                    name="contacts"
                    control={methods.control}
                    defaultValue=''
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            select
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
                />
         </Box>
      </Box>
   )
}

export default Contacts