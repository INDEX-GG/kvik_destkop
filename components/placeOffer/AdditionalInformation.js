import { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, makeStyles, TextField, Typography, MenuItem } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    formInputMainField: {
        display: 'flex',
    },
    formElem: {
        marginBottom: theme.spacing(3),
    },
    formTitleField: {
        flex: '1 1',
        padding: '4px 0',
    },
    formInputField: {
        width: '490px',
    },
    input: {
        width: '264px',
    },
}));

const AdditionalInformation = (data) => {
    console.log('=======>', data.newOBJ[data.asd])

    const classes = useStyles();
    const methods = useFormContext();


    switch (data.asd) {
        case 'new_building':

            break;
        case 'secondary_housing':

            break;
        case 'rent_apartments':

            break;
        case 'sell_rooms':

            break;
        case 'rent_rooms':

            break;
        case 'sell_houses_and_cottages':

            break;
        case 'rent_houses_and_cottages':

            break;
        case 'sell_office_space':

            break;
        case 'rent_office_space':

            break;
        case 'sell_commercial_premises':

            break;
        case 'rent_commercial_premises':

            break;
        case 'sell_warehouse_space':

            break;
        case 'rent_warehouse_space':

            break;
        case 'sell_production_room':

            break;
        case 'rent_production_room':

            break;
        case 'sell_free_premises':

            break;
        case 'rent_free_premises':

            break;
        case 'sell_building':

            break;
        case 'rent_building':

            break;
        case 'sell_izhs':

            break;
        case 'sell_SNT':

            break;
        case 'sell_agriculturalLand':

            break;
        case 'sell_commercialLand':

            break;
        case 'wwwwwwewwwwww':

            break;
        case 'wwwwwwewwwwww':

            break;
        case 'wwwwwwewwwwww':

            break;
        case 'wwwwwwewwwwww':

            break;
        case 'wwwwwwewwwwww':

            break;
        case 'wwwwwwewwwwww':

            break;
        case 'wwwwwwewwwwww':

            break;
        case 'wwwwwwewwwwww':

            break;
        case 'wwwwwwewwwwww':

            break;
        case 'wwwwwwewwwwww':

            break;
        case 'wwwwwwewwwwww':

            break;
        case 'wwwwwwewwwwww':

            break;
        case 'wwwwwwewwwwww':

            break;
        case 'wwwwwwewwwwww':

            break;
        case 'wwwwwwewwwwww':

            break;

        case 'wwwwwwewwwwww':

            break;
        case 'wwwwwwewwwwww':

            break;
        case 'wwwwwwewwwwww':

            break;
        case 'wwwwwwewwwwww':

            break;
        case 'wwwwwwewwwwww':

            break;
        case 'wwwwwwewwwwww':

            break;
        case 'wwwwwwewwwwww':

            break;
        case 'wwwwwwewwwwww':

            break;
        case 'wwwwwwewwwwww':

            break;
        case 'wwwwwwewwwwww':

            break;
        case 'wwwwwwewwwwww':

            break;
        case 'wwwwwwewwwwww':

            break;
        case 'wwwwwwewwwwww':

            break;
        case 'wwwwwwewwwwww':

            break;
        default:
            break;
    }





    return (
        <>
        </>
        //     <Box className={classes.formElem}>
        //         {Object.entries(data.newOBJ).map((item, key) => (
        //             <>
        //                 {item[1].fields.marks !== undefined && (
        //                     <>
        //                         <Box key={key} className={classes.formInputMainField}>
        //                             <Typography className={classes.formTitleField}>Марка</Typography>
        //                             <Box className={classes.formInputField}>
        //                                 <Controller
        //                                     name={"modelsAuto"}
        //                                     control={methods.control}
        //                                     render={({ field: { onChange, value }, fieldState: { error } }) => (
        //                                         <TextField
        //                                             select
        //                                             className={classes.input}
        //                                             variant='outlined'
        //                                             value={value}
        //                                             onChange={onChange}
        //                                             error={!!error}
        //                                             helperText={error ? error.message : ' '}>
        //                                             {item[1].fields.marks.map((item, i) => (
        //                                                 <MenuItem key={i} value={item.name}>
        //                                                     {item.name}
        //                                                 </MenuItem>
        //                                             ))}
        //                                         </TextField>
        //                                     )}
        //                                     rules={{ required: 'Выбирите ' }}
        //                                 />
        //                             </Box>
        //                         </Box>

        //                         <Box key={key} className={classes.formInputMainField}>
        //                             {methods.watch('modelsAuto') &&
        //                                 <>
        //                                     <Typography className={classes.formTitleField}>Модель</Typography>
        //                                     <Box className={classes.formInputField}>
        //                                         <Controller
        //                                             name="carModel"
        //                                             control={methods.control}
        //                                             render={({ field: { onChange, value }, fieldState: { error } }) => (
        //                                                 <TextField
        //                                                     select
        //                                                     className={classes.input}
        //                                                     variant='outlined'
        //                                                     value={value}
        //                                                     onChange={onChange}
        //                                                     error={!!error}
        //                                                     helperText={error ? error.message : ' '}
        //                                                 >
        //                                                     {item[1].fields.marks.filter(item => item.name === methods.watch('modelsAuto')).map((item, i) => item.models.map((item, i) =>
        //                                                         <MenuItem key={i} value={item.name}>
        //                                                             {item.name}
        //                                                         </MenuItem>
        //                                                     ))
        //                                                     }
        //                                                 </TextField>
        //                                             )}
        //                                             rules={{ required: 'Выбирите ' }}
        //                                         />
        //                                     </Box>
        //                                 </>
        //                             }
        //                         </Box>

        //                         {/* <Box key={key} className={classes.formInputMainField}>
        //                             {methods.watch('modelsAuto') &&
        //                                 <>
        //                                     <Typography className={classes.formTitleField}>Модель</Typography>
        //                                     <Box className={classes.formInputField}>
        //                                         <Controller
        //                                             name="carModel"
        //                                             control={methods.control}
        //                                             render={({ field: { onChange, value }, fieldState: { error } }) => (
        //                                                 <TextField
        //                                                     select
        //                                                     className={classes.input}
        //                                                     variant='outlined'
        //                                                     value={value}
        //                                                     onChange={onChange}
        //                                                     error={!!error}
        //                                                     helperText={error ? error.message : ' '}
        //                                                 >
        //                                                     {item[1].fields.marks.filter(item => item.name === methods.watch('modelsAuto')).map((item, i) => item.models.map((item, i) =>
        //                                                         <MenuItem key={i} value={item.name}>
        //                                                             {item.name}
        //                                                         </MenuItem>
        //                                                     ))
        //                                                     }
        //                                                 </TextField>
        //                                             )}
        //                                             rules={{ required: 'Выбирите ' }}
        //                                         />
        //                                     </Box>
        //                                 </>
        //                             }
        //                         </Box> */}
        //                     </>
        //                 )}
        //                 <Box key={key} className={classes.formInputMainField}>

        //                     {item[1].fields.marks === undefined &&
        //                         (item[1].fields === 'NULL' ?
        //                             <>
        //                                 <Typography className={classes.formTitleField}>{item[1].name}</Typography>
        //                                 <Box className={classes.formInputField}>
        //                                     <Controller
        //                                         name={item[1].alias}
        //                                         control={methods.control}
        //                                         defaultValue=''
        //                                         render={({ field: { onChange, value }, fieldState: { error } }) => (
        //                                             <TextField
        //                                                 variant='outlined'
        //                                                 type="text"
        //                                                 fullWidth
        //                                                 autoComplete="on"
        //                                                 value={value}
        //                                                 onChange={onChange}
        //                                                 error={!!error} helperText={error ? error.message : ' '} />
        //                                         )}
        //                                         rules={{ required: 'Укажите ваше местоположение...' }}
        //                                     />
        //                                 </Box>
        //                             </>
        //                             :
        //                             <>
        //                                 <Typography className={classes.formTitleField}>{item[1].name}</Typography>
        //                                 <Box className={classes.formInputField}>
        //                                     <Controller
        //                                         name={'aliasFields' + key}
        //                                         control={methods.control}
        //                                         render={({ field: { onChange, value }, fieldState: { error } }) => (
        //                                             <TextField
        //                                                 select
        //                                                 className={classes.input}
        //                                                 variant='outlined'
        //                                                 value={value}
        //                                                 onChange={onChange}
        //                                                 error={!!error}
        //                                                 helperText={error ? error.message : ' '}>
        //                                                 {item[1].fields.map((option, i) => (
        //                                                     <MenuItem key={i} value={option}>
        //                                                         {option}
        //                                                     </MenuItem>
        //                                                 ))}
        //                                             </TextField>
        //                                         )}
        //                                         rules={{ required: 'Выбирите ' }}
        //                                     />
        //                                 </Box>
        //                             </>
        //                         )}
        //                 </Box>
        //             </>))}
        //     </Box>
    )
}
export default AdditionalInformation
