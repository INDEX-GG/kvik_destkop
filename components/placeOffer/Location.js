import { Controller, useFormContext } from 'react-hook-form';
import { Box, makeStyles, TextField, Typography } from '@material-ui/core';

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
}));

const Location = () => {

   const classes = useStyles();
   const methods = useFormContext();

   return (
      <Box className={classes.formElem}>
         <Typography className={classes.formTitleField}>Местоположение</Typography>
         <Box className={classes.formInputField}>
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
               rules={{ required: 'заполните тест' }}
            />
         </Box>
      </Box>
   )
}

export default Location