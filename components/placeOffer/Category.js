import { Controller, useFormContext } from 'react-hook-form';
import { Box, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core';
import { useCategory } from '../../hooks/useCategory';
import {getMoreCategory} from "#lib/utils/generateCategory";


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

const Category = ({category}) => {

    const classes = useStyles();
    const methods = useFormContext();
    const { categoriesByAlias } = useCategory();


    const aliasOne = methods.watch('alias1');
    const aliasTwo = methods.watch('alias2');

    const categoryNestingOne = getMoreCategory(category, aliasOne)
    const categoryNestingTwo = getMoreCategory(category, aliasOne, aliasTwo)


    // useEffect(() => {
    //     methods.setValue('alias1', '')
    // }, [])

    // Очитска полей при изменении категории
    const handlerResetCategory = (alias) => {
        if (alias === 'alias1') {
            methods.setValue('alias2', '');
            methods.setValue('alias3', '');
            methods.setValue('alias4', '');
            methods.unregister('alias2', '');
            methods.unregister('alias3', '');
            methods.unregister('alias4', '');
        }

        if (alias === 'alias2') {
            methods.setValue('alias3', '');
            methods.setValue('alias4', '');
            methods.unregister('alias3');
            // methods.unregister('alias4');
        }

        if (alias === 'alias3') {
            methods.setValue('alias4', '');
            methods.unregister('alias4');
        }
    }

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
                            onClick={() => handlerResetCategory('alias1')}
                            error={!!error}
                            helperText={error ? error.message : ' '}>
                            {category.map((option, i) => (
                                <MenuItem key={i} value={option.alias}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                    rules={{ required: 'Выберите Категорию' }}
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
                            onClick={() => handlerResetCategory('alias2')}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : ' '}>
                            {categoryNestingOne.children.map((option, i) => (
                                <MenuItem key={i} value={option.alias}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                    rules={{ required: 'Выберите Категорию' }}
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
                            onClick={() => handlerResetCategory('alias3')}
                            error={!!error}
                            helperText={error ? error.message : ' '}>
                            {categoryNestingTwo.children.map((option, i) => (
                                <MenuItem key={i} value={option.alias}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                    rules={{ required: 'Выберите Категорию' }}
                />}

                {/*{categoriesByAlias(methods.watch('alias1'), methods.watch('alias2'), methods.watch('alias3')) &&*/}
                {/*methods.watch('alias3') && */}
                {/*<Controller*/}
                {/*    name="alias4"*/}
                {/*    control={methods.control}*/}
                {/*    defaultValue=''*/}
                {/*    render={({ field: { onChange, value }, fieldState: { error } }) => (*/}
                {/*        <TextField*/}
                {/*            select*/}
                {/*            className={classes.input}*/}
                {/*            variant='outlined'*/}
                {/*            value={value}*/}
                {/*            onChange={onChange}*/}
                {/*            error={!!error}*/}
                {/*          */}
                {/*            helperText={error ? error.message : ' '}>*/}
                {/*            {categoriesByAlias(methods.watch('alias1'), methods.watch('alias2'), methods.watch('alias3')).map((option, i) => (*/}
                {/*                <MenuItem key={i} value={option.alias}>*/}
                {/*                    {option.label}*/}
                {/*                </MenuItem>*/}
                {/*            ))}*/}
                {/*        </TextField>*/}
                {/*    )}*/}
                {/*    rules={{ required: 'Выберите Категорию' }}*/}
                {/*/>}*/}
            </Box>
        </Box>
    )
}

export default Category;
