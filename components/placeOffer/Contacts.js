import { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, Checkbox, FormControlLabel, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core';
import OutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import Filledicon from '@material-ui/icons/Brightness1';
import { phoneNumber } from '../../lib/services';
import Loader from '../../UI/icons/Loader';
import { useStore } from '../../lib/Context/Store';

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
      display: 'flex',
      flexDirection: 'row', 
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
    error: {
        color: theme.palette.error.main,
        fontSize: '12px',
        paddingTop: '2px',
        marginLeft: '24px',
    },
}));

const Contacts = () => {
	const {userInfo} = useStore();
	const [phones, setPhones] = useState([]);
    const classes = useStyles();
    const methods = useFormContext();

useEffect(() => {
	if (userInfo !== undefined) {
		setPhones([{value: userInfo.phone, label: phoneNumber(userInfo.phone)}]);
	}
}, [userInfo])

   return (
      <Box className={classes.formElem}>
         <Typography className={classes.formTitleField}>Контакты</Typography>
         <Box className={classes.formInputField}>
		 {userInfo === undefined && <Loader size={32}/>}
         {userInfo !== undefined && <Controller
                name="contact"
				defaultValue={userInfo.phone}
                control={methods.control}
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
            />}
            <Box>
                <Controller
                    name='bymessages'
                    control={methods.control}
                    defaultValue={true}
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
                    defaultValue={true}
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
                <Typography className={classes.error}>{methods.formState.errors?.byphone?.message}</Typography>
            </Box>
         </Box>
      </Box>
   )
}

export default Contacts