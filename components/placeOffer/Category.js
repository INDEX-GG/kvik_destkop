import { useState, useEffect } from 'react';
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
        }
    },
    input: {
        width: '264px',
    },

}));

const Category = () => {

    const classes = useStyles();
    const methods = useFormContext();
    const { categoryMain, categoriesById } = useCategory();

    console.log(methods.watch('category_1'))
    console.log(methods.watch('category_2'))
    return (
        <Box className={classes.formElem}>
            <Typography className={classes.formTitleField}>Категория</Typography>
            <Box className={classes.formInputField}>
                <Controller
                    name="category_1"
                    control={methods.control}
                    defaultValue=''
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            select
                            className={classes.input}
                            variant='outlined'
                            value={value}
                            onChange={onChange}
                            onClick={() => methods.setValue('category_2', '')}
                            error={!!error}
                            helperText={error ? error.message : ' '}>
                            {categoryMain.map((option, i) => (
                                <MenuItem key={i} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                    rules={{ required: 'Выбирите Категорию' }}
                />

                {methods.watch('category_1') && <Controller
                    name="category_2"
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
                            {categoriesById(methods.watch('category_1')).map((option, i) => (
                                <MenuItem key={i} value={option.value}>
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