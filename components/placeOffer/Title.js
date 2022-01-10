import {Controller, useFormContext} from 'react-hook-form';
import {Box, makeStyles, Typography} from '@material-ui/core';
import {invalidСharacterProduct} from '../../lib/regulars'
import FieldInput from "#components/placeOffer/newPlaceOffer/FieldsMobile/FieldInput";


const useStyles = makeStyles((theme) => ({
    formElem: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: theme.spacing(3),
        [theme.breakpoints.down(960)]: {
            marginBottom: '15px'
        }
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
            height: '48px'
        }
    },
}));

const Title = ({title}) => {

    const classes = useStyles();
    const methods = useFormContext();

    // methods.setValue('title', '')

    return (
        <Box className={classes.formElem}>
            <Typography className={classes.formTitleField}>Название</Typography>
            <Box className={classes.formInputField}>
                <Controller
                    name="title"
                    control={methods.control}
                    defaultValue={title}
                    render={({field: {onChange, value}, fieldState: {error}}) => (
                        <FieldInput
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : ''}
                            placeholder='Название'>
                            {title}
                        </FieldInput>
                    )}
                    rules={{
                        required: 'Введите название Товара',
                        pattern: {value: invalidСharacterProduct(), message: 'Недопустимые символы'},
                    }}
                />
            </Box>
        </Box>
    )
}

export default Title