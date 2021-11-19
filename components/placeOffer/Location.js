// import { Controller, useFormContext } from 'react-hook-form';
import { Box, makeStyles, Typography /** TextFiel */ } from '@material-ui/core';
// import { invalidСharacterLocation } from '../../lib/regulars'
// import YandexMap from '../YandexMap';
import DadataSuggest from '../DadataSuggest'

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

const Location = ({address}) => {

   const classes = useStyles();
//    const methods = useFormContext();

   // console.log(address)


   return (
      <Box className={classes.formElem}>
        <Typography className={classes.formTitleField}>Местоположение</Typography>
         <Box className={classes.formInputField}>
			<DadataSuggest address={address}/>
         </Box>
      </Box>
   )
}

export default Location