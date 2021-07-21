import { Controller, useFormContext } from 'react-hook-form';
import { Box, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core';
import { useCategory } from '../../hooks/useCategory';

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
        flexDirection: 'column',
        '&>*': {
            marginBottom: theme.spacing(2),
        },
		'&>*:last-child': {
			marginBottom: 0,
		},
    },
    input: {
        width: '264px',
    },
}));

const Category = () => {

    const classes = useStyles();
    const methods = useFormContext();
    const { categoryMainAlias, categoriesByAlias } = useCategory();

    return (
        <Box className={classes.formElem}>
            <Typography className={classes.formTitleField}>Категория</Typography>
            <Box className={classes.formInputField}>
                <Controller
                    name="alias1"
                    control={methods.control}
                    defaultValue=''
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            select
                            className={classes.input}
                            variant='outlined'
                            value={value}
                            onChange={onChange}
                            onClick={() => {
                                methods.setValue('alias2', '');
                                methods.setValue('alias3', '');
                                methods.setValue('alias4', '');
                                methods.unregister('alias2', '');
                                methods.unregister('alias3', '');
                                methods.unregister('alias4', '');
                            }}
                            error={!!error}
                            helperText={error ? error.message : ' '}>
                            {categoryMainAlias.map((option, i) => (
                                <MenuItem key={i} value={option.alias}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                    rules={{ required: 'Выбирите Категорию' }}
                />

                {methods.watch('alias1') && <Controller
                    name="alias2"
                    control={methods.control}
                    defaultValue=''
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            select
                            className={classes.input}
                            variant='outlined'
                            value={value}
                            onClick={() => {
                                methods.setValue('alias3', '');
                                methods.setValue('alias4', '');
                                methods.unregister('alias3');
                                methods.unregister('alias4');
                            }}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : ' '}>
                            {categoriesByAlias(methods.watch('alias1')).map((option, i) => (
                                <MenuItem key={i} value={option.alias}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                    rules={{ required: 'Выбирите Категорию' }}
                />}

                {categoriesByAlias(methods.watch('alias1'), methods.watch('alias2')) &&
                methods.watch('alias2') && 
                <Controller
                    name="alias3"
                    control={methods.control}
                    defaultValue=''
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            select
                            className={classes.input}
                            variant='outlined'
                            value={value}
                            onChange={onChange}
                            onClick={() => {
                                methods.setValue('alias4', '');
                                methods.unregister('alias4');
                            }}
                            error={!!error}
                            helperText={error ? error.message : ' '}>
                            {categoriesByAlias(methods.watch('alias1'), methods.watch('alias2')).map((option, i) => (
                                <MenuItem key={i} value={option.alias}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                    rules={{ required: 'Выбирите Категорию' }}
                />}

                {categoriesByAlias(methods.watch('alias1'), methods.watch('alias2'), methods.watch('alias3')) &&
                methods.watch('alias3') && 
                <Controller
                    name="alias4"
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
                            {categoriesByAlias(methods.watch('alias1'), methods.watch('alias2'), methods.watch('alias3')).map((option, i) => (
                                <MenuItem key={i} value={option.alias}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                    rules={{ required: 'Выбирите Категорию' }}
                />}
            </Box>
        </Box>
    )
}

export default Category;