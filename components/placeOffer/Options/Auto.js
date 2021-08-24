import { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, makeStyles, TextField, Typography, MenuItem } from '@material-ui/core';
import axios from 'axios';
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';
import { object } from 'prop-types';


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


export default function Auto({ data }) {

    // console.log(methods.watch('modelsAuto'))
    // console.log(methods.watch('submodels'))
    // console.log(methods.watch('generation'))
    // console.log(methods.watch('modification'))
    // console.log('+++++', mark)
    // console.log('+++++', model)
    // console.log('+++++', generation)
    // console.log('+++++', generationUnical)
    // console.log('+++++', modification && modification[0])

    const classes = useStyles();
    const methods = useFormContext();

    const [mark, setMark] = useState(),
        [model, setModel] = useState(),
        [generation, setGeneration] = useState(),
        [generationUnical, setGenerationUnical] = useState(),
        [modification, setModification] = useState(),
        [fullDescription, setFullDescription] = useState();

    useEffect(() => {
        setGeneration(undefined)
        setGenerationUnical(undefined)
        setModification(undefined)
        setModel(undefined)
        setFullDescription(undefined)
        if (methods.watch('modelsAuto') != undefined) {
            axios.get(`/auto_brand/` + (methods.watch('modelsAuto')) + `.json`)
                .then((result) => setMark(result.data))
                .catch((e) => console.log(e))
        }
    }, [methods.watch('modelsAuto')])

    useEffect(() => {
        setGeneration(undefined)
        setGenerationUnical(undefined)
        setModification(undefined)
        setModel(undefined)
        setFullDescription(undefined)
        if (mark != undefined) {
            setModel(mark.children.filter(item => item.value === methods.watch('submodels')).map(item => item.children.map(item => item)))
        }
    }, [methods.watch('submodels')])

    useEffect(() => {
        setModification(undefined)
        setFullDescription(undefined)
        if (model != undefined) {
            let gen = model.map((item, i) => item.filter((item, i) => item.value === methods.watch('generation')))
            setGenerationUnical([...new Set((gen[0][0].children.sort((a, b) => a.value > b.value ? 1 : -1)).map(item => item.value))])
            setGeneration(gen)
        }
    }, [methods.watch('generation')])

    useEffect(() => {
        setFullDescription(undefined)
        if (generation != undefined) {
            let arr = []
            let mod = (generation[0].map(item => item.children.map(item => item)));
            arr = ((mod[0].filter(item => item.value === methods.watch('modification'))).map(item => item))
            console.log(arr)
            setModification(arr.map(item => item.children))
        }
    }, [methods.watch('modification')])

    useEffect(() => {
        if (modification != undefined) {
            let newObjBodytype = [],
                newObjDoors = [],
                newObjdrivetype = [],
                newObjcomplectations = [];
            for (let i = 0; i < modification.length; i++) {
                console.log(...(modification[i].map(item => item.value)[13]))
                newObjdrivetype.push(
                    (modification[i].map(item => item.value))[6]
                )
                newObjBodytype.push(
                    (modification[i].map(item => item.value))[11]
                )
                newObjDoors.push(
                    (modification[i].map(item => item.value))[12]
                )
                newObjcomplectations.push(
                    
                    ...(modification[i].map(item => item.value)[13]).map(item => item.value)
                )
                
            }
            // console.log('======>', [...new Set(newObjdrivetype)])
            // console.log('======>', [...new Set(newObjBodytype)])
            // console.log('======>', [...new Set(newObjDoors)])
            // console.log('======>', [...new Set(newObjcomplectations)])
            modification[0][6].value = [...new Set(newObjdrivetype)]
            modification[0][11].value = [...new Set(newObjBodytype)]
            modification[0][12].value = [...new Set(newObjDoors)]
            modification[0][13].complectations = [...new Set(newObjcomplectations)]
            setFullDescription(modification[0])
        }
    }, [modification])


    return (

        data.map(item => {
            switch (item.type) {
                case 'listRec':
                    switch (item.alias) {
                        case 'marks':
                            //Вывод марки
                            return (
                                <>
                                    <Box className={classes.formInputMainField}>
                                        <Typography className={classes.formTitleField}>{item.name}</Typography>
                                        <Box className={classes.formInputField}>
                                            <Controller
                                                name={"modelsAuto"}
                                                control={methods.control}
                                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                                    <TextField
                                                        select
                                                        className={classes.input}
                                                        variant='outlined'
                                                        value={value}
                                                        onChange={onChange}
                                                        error={!!error}
                                                        helperText={error ? error.message : ' '}>
                                                        {item.fields.map((item, i) => (
                                                            <MenuItem key={i} value={item}>
                                                                {item}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                )}
                                                rules={{ required: 'Выбирите ' }}
                                            />
                                        </Box>
                                    </Box>

                                    {mark &&
                                        //Вывод модели
                                        <Box className={classes.formInputMainField}>
                                            <Typography className={classes.formTitleField}>Модель</Typography>
                                            <Box className={classes.formInputField}>
                                                <Controller
                                                    name={"submodels"}
                                                    control={methods.control}
                                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                                        <TextField
                                                            select
                                                            className={classes.input}
                                                            variant='outlined'
                                                            value={value}
                                                            onChange={onChange}
                                                            error={!!error}
                                                            helperText={error ? error.message : ' '}>
                                                                {console.log(mark.children)}
                                                            {(mark.children?.sort((a, b) => a.value > b.value ? 1 : -1))?.map((item, i) => (
                                                                <MenuItem key={i} value={item.value}>
                                                                    {item.value}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                    )}
                                                    rules={{ required: 'Выбирите ' }}
                                                />
                                            </Box>
                                        </Box>
                                    }
                                    {model &&
                                        //Вывод поколения
                                        <Box className={classes.formInputMainField}>
                                            <Typography className={classes.formTitleField}>Поколение</Typography>
                                            <Box className={classes.formInputField}>
                                                <Controller
                                                    name={"generation"}
                                                    control={methods.control}
                                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                                        <TextField
                                                            select
                                                            className={classes.input}
                                                            variant='outlined'
                                                            value={value}
                                                            onChange={onChange}
                                                            error={!!error}
                                                            helperText={error ? error.message : ' '}>
                                                            {model.map(item => item.sort((a, b) => a.value > b.value ? 1 : -1).map((item, i) => (
                                                                <MenuItem key={i} value={item.value}>
                                                                    {item.value}
                                                                </MenuItem>
                                                            )))}
                                                        </TextField>
                                                    )}
                                                    rules={{ required: 'Выбирите ' }}
                                                />
                                            </Box>
                                        </Box>
                                    }

                                    {generationUnical &&
                                        //Вывод модификации
                                        <Box className={classes.formInputMainField}>
                                            <Typography className={classes.formTitleField}>Модификация</Typography>
                                            <Box className={classes.formInputField}>
                                                <Controller
                                                    name={"modification"}
                                                    control={methods.control}
                                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                                        <TextField
                                                            select
                                                            className={classes.input}
                                                            variant='outlined'
                                                            value={value}
                                                            onChange={onChange}
                                                            error={!!error}
                                                            helperText={error ? error.message : ' '}>
                                                            {generationUnical.map((item, i) => {
                                                                return (
                                                                    <MenuItem key={i} value={item}>
                                                                        {item}
                                                                    </MenuItem>
                                                                )
                                                            })}
                                                        </TextField>
                                                    )}
                                                    rules={{ required: 'Выбирите ' }}
                                                />
                                            </Box>
                                        </Box>
                                    }
                                    {fullDescription &&
                                        fullDescription.map((item, i) => {
                                            //Вывод доп полей
                                            switch (typeof item.value) {
                                                case 'object':
                                                    switch (item.alias) {
                                                        case 'complectations':
                                                            return (
                                                                <Box className={classes.formInputMainField}>
                                                                    <Typography className={classes.formTitleField}>{item.name}</Typography>
                                                                    {console.log(item.value)}
                                                                    <Box className={classes.formInputField}>
                                                                        <Controller
                                                                            name={"fullDescription"}
                                                                            control={methods.control}
                                                                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                                                                <TextField
                                                                                    select
                                                                                    className={classes.input}
                                                                                    variant='outlined'
                                                                                    value={value}
                                                                                    onChange={onChange}
                                                                                    error={!!error}
                                                                                    helperText={error ? error.message : ' '}>
                                                                                    {item.value.map((item, i) =>
                                                                                        <MenuItem key={i} value={item.value}>
                                                                                            {item.value}
                                                                                        </MenuItem>
                                                                                    )}
                                                                                </TextField>
                                                                            )}
                                                                            rules={{ required: 'Выбирите ' }}
                                                                        />
                                                                    </Box>
                                                                </Box>
                                                            );
                                                        default:
                                                            return (
                                                                <Box className={classes.formInputMainField}>
                                                                    <Typography className={classes.formTitleField}>{item.name}</Typography>
                                                                    <Box className={classes.formInputField}>
                                                                        <Controller
                                                                            name={"fullDescription"}
                                                                            control={methods.control}
                                                                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                                                                <TextField
                                                                                    select
                                                                                    className={classes.input}
                                                                                    variant='outlined'
                                                                                    value={value}
                                                                                    onChange={onChange}
                                                                                    error={!!error}
                                                                                    helperText={error ? error.message : ' '}>
                                                                                    {item.value.map((item, i) =>
                                                                                        <MenuItem key={i} value={item}>
                                                                                            {item}
                                                                                        </MenuItem>
                                                                                    )}
                                                                                </TextField>
                                                                            )}
                                                                            rules={{ required: 'Выбирите ' }}
                                                                        />
                                                                    </Box>
                                                                </Box>
                                                            );
                                                    }


                                                default:
                                                    return (
                                                        <Box className={classes.formInputMainField}>
                                                            <Typography className={classes.formTitleField}>{item.name}</Typography>
                                                            <Box className={classes.formInputField}>
                                                                <Controller
                                                                    name={"fullDescription"}
                                                                    control={methods.control}
                                                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                                                        <TextField
                                                                            select
                                                                            className={classes.input}
                                                                            variant='outlined'
                                                                            value={value}
                                                                            onChange={onChange}
                                                                            error={!!error}
                                                                            helperText={error ? error.message : ' '}>
                                                                            <MenuItem key={i} value={item.value}>
                                                                                {item.value}
                                                                            </MenuItem>
                                                                        </TextField>
                                                                    )}
                                                                    rules={{ required: 'Выбирите ' }}
                                                                />
                                                            </Box>
                                                        </Box>)
                                            }
                                        })
                                    }
                                </>
                            )
                        default:
                            return (
                                <Box className={classes.formInputMainField}>
                                    <Typography className={classes.formTitleField}>{item.name}</Typography>
                                    <Box className={classes.formInputField}>
                                        <Controller
                                            name={"listRec"}
                                            control={methods.control}
                                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                                <TextField
                                                    select
                                                    className={classes.input}
                                                    variant='outlined'
                                                    value={value}
                                                    onChange={onChange}
                                                    error={!!error}
                                                    helperText={error ? error.message : ' '}>
                                                    {/* {item.fields.map((item, i) => (
                                                        <MenuItem key={i} value={item}>
                                                            {item}
                                                        </MenuItem>
                                                    ))} */}
                                                </TextField>
                                            )}
                                            rules={{ required: 'Выбирите ' }}
                                        />
                                    </Box>
                                </Box>
                            )
                    }



                case 'list':

                    break;

                case 'textRec':

                    break;

                case 'text':

                    break;

                case 'checkboxRec':

                    break;

                case 'checkbox':

                    break;

                case 'radio':

                    break;

                default:
                    break;
            }


        }
        )
    )
}


