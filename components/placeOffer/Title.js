import { useForm, Controller } from 'react-hook-form';
import { Box, makeStyles, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
   formElem: {
      display: 'flex',
      flexDirection: 'row',
   },
   formTitleField: {
      flexGrow: 1,
      padding: '4px 0',
   },
   formInputField: {
      width: '490px',
   },
   input: {
      '& input': {
         padding: '8px 16px',
      }
   }
}));

const Title = () => {

   const classes = useStyles();
   const { control } = useForm();

   return (
      <Box className={classes.formElem}>
         <Typography className={classes.formTitleField}>Название</Typography>
         <Box className={classes.formInputField}>
            <Controller
               name="title"
               control={control}
               defaultValue=''
               render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                     className={classes.input}
                     variant='outlined'
                     type="text"
                     fullWidth
                     autoComplete="on"
                     value={value}
                     onChange={onChange}
                     error={!!error} helperText={error ? error.message : ' '} />
               )}
               rules={{ required: 'Введите название товара' }}
            />
         </Box>
      </Box>
   )
}

export default Title
