import { Controller, useFormContext } from 'react-hook-form';
import { Box, Checkbox, FormControlLabel, makeStyles, TextField, Typography } from '@material-ui/core';
import OutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import Filledicon from '@material-ui/icons/Brightness1';

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
   priceField: {
       display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',

   },
}));

const Price = () => {

   const classes = useStyles();
   const methods = useFormContext();

   return (
      <Box className={classes.formElem}>
         <Typography className={classes.formTitleField}>Цена</Typography>
         <Box className={classes.formInputField}>
             <Box className={classes.priceField}>
                <Controller
                    name="price"
                    control={methods.control}
                    defaultValue=''
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            variant='outlined'
                            type="text"
                            autoComplete="on"
                            value={value}
                            onChange={onChange}
                            error={!!error} helperText={error ? error.message : ' '} />
                    )}
                    rules={{ required: `Введите цену ${methods.watch('title')}` }}
                />

                <Controller
                    name='trade'
                    control={methods.control}
                    render={({ field: { onChange, value }}) => (
                        <FormControlLabel
                        control={
                    <Checkbox
                        id='trade'
                        color='primary'
                        icon={<OutlinedIcon/>}
                        checkedIcon={<Filledicon/>}
                        checked={value}
                        onChange={(e) => onChange(e.target.checked)}
                    />}
                    label="Торг"
                    />
                    )}
                />
            </Box>
         </Box>
      </Box>
   )
}

export default Price