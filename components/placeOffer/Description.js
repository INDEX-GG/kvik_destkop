import {Controller, useFormContext} from 'react-hook-form';
import {Box, makeStyles, Typography} from '@material-ui/core';
import FieldInput from "#components/placeOffer/newPlaceOffer/FieldsMobile/FieldInput";


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
        [theme.breakpoints.down(960)]: {
            display: 'none'
        }
    },
    formInputField: {
        width: '490px',
        [theme.breakpoints.down(960)]: {
            width: '100%',
            minHeight: '48px'
        }
    },
}));

const Description = ({description}) => {

    const classes = useStyles();
    const methods = useFormContext();

    return (
        <Box className={classes.formElem}>
            <Typography className={classes.formTitleField}>Описание</Typography>
            <Box className={classes.formInputField}>
                <Controller
                    name="description"
                    control={methods.control}
                    defaultValue={description}
                    render={({field: {onChange, value}, fieldState: {error}}) => (
                        // <TextField
                        //     variant='outlined'
                        //     type="text"
                        //     multiline
                        //     rows='4'
                        //     rowsMax='6'
                        //     fullWidth
                        //     autoComplete="on"
                        //     value={value}
                        //     inputProps={{maxLength: 4000}}
                        //     onChange={onChange}
                        //     error={!!error} helperText={error ? error.message : ' '}>
                        //     {description}
                        // </TextField>
                        <FieldInput
                            multiline={true}
                            placeholder='Описание'
                            rows='4'
                            rowsMax='6'
                            value={value}
                            inputProps={{maxLength: 4000}}
                            onChange={onChange}
                            error={!!error} helperText={error ? error.message : ' '}>
                            {description}
                        </FieldInput>
                    )}
                    rules={{
                        required: `Опишите ${methods.watch('title')}`,
                        // pattern: {value: /^[a-zA-Zа-яА-Я0-9\s,."'()%*!?+®#№=/-]+$/, message: 'Недопустимые символы' },
                    }}
                />
            </Box>
        </Box>
    )
}

export default Description;