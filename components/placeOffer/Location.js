import { Controller, useFormContext } from 'react-hook-form';
import { Box, makeStyles, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
   formElem: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: theme.spacing(3),
   },
   formTitleField: {
      fontSize: '14px',
      flexGrow: 1,
      padding: '4px 0',
   },
   formInputField: {
      width: '490px',
   },
   map: {
       height: '224px',
       borderRadius: theme.shape.borderRadius,
   }
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
					 inputProps={{maxLength: 50}}
                     onChange={onChange}
                     error={!!error} helperText={error ? error.message : ' '} />
               )}
               rules={{ 
				   required: 'Укажите ваше местоположение...',
				   pattern: {value:/^[a-zA-Zа-яА-Я0-9,.\s"'()-]+$/, message: 'Недопустимые символы' },
				}}
            />
            <iframe className={classes.map} src="https://yandex.ru/map-widget/v1/?um=constructor%3Ade278bb067489a15a031480c20e3318914d391acd3e1995348d759fa5baa2167&amp;source=constructor" width="100%" height="100%" frameBorder="0"></iframe>
         </Box>
      </Box>
   )
}

export default Location