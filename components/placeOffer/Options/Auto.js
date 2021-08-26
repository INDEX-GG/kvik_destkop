import { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, makeStyles, TextField, Typography, MenuItem } from '@material-ui/core';
import axios from 'axios';
import ColorAuto from '../../json/color.json'

const useStyles = makeStyles((theme) => ({
    formInputMainField: {
        display: 'flex',
    },
    formInputMainField_text: {
        display: 'flex',
        marginBottom: '19px',
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
    formColorMain: {
        width: '490px',
        display: 'flex',
        flexWrap: 'wrap',
    },
    formColor: {
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        marginRight: '2px',
        cursor: 'pointer',
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


    console.log(methods.watch('doors'))

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
            let gen = model.map((item) => item.filter((item) => item.value === methods.watch('generation')))
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
            let newObjdrivetype = [],
                newObjBodytype = [],
                newObjDoors = [],
                newObjcomplectations = [],
                newObjyear = [],
                n = ((modification[0].filter(item => item.alias === 'yearfrom').map(item => +item.value)))[0],
                m = ((modification[0].filter(item => item.alias === 'yearto').map(item => +item.value)))[0];

            for (var i = n; i <= m; i++) {
                newObjyear.push(i)
            }

            for (let i = 0; i < modification.length; i++) {

                newObjdrivetype.push(
                    ...((modification[i].filter(item => item.alias === 'drivetype').map(item => item.value)))
                )
                newObjBodytype.push(
                    ...((modification[i].filter(item => item.alias === 'bodytype').map(item => item.value)))
                )
                newObjDoors.push(
                    ...((modification[i].filter(item => item.alias === 'doors').map(item => item.value)))
                )
                newObjcomplectations.push(
                    ...((modification[i].filter(item => item.alias === 'complectations').map(item => item.value)))
                )
            }

            // console.log('======>', [...new Set(newObjdrivetype)])
            // console.log('======>', [...new Set(newObjBodytype)])
            // console.log('======>', [...new Set(newObjDoors)])
            // console.log('======>', [...new Set(newObjcomplectations)])
            modification[0].filter(item => item.alias === 'drivetype')[0].value = [...new Set(newObjdrivetype)]
            modification[0].filter(item => item.alias === 'bodytype')[0].value = [...new Set(newObjBodytype)]
            modification[0].filter(item => item.alias === 'doors')[0].value = [...new Set(newObjDoors)]
            modification[0].filter(item => item.alias === 'complectations')[0].complectations = [...new Set(newObjcomplectations)]
            modification[0].unshift({ alias: "year", name: "Год выпуска", value: newObjyear })
            setFullDescription(modification[0])
        }
    }, [modification])

    console.log(modification && modification[0])

    return (
        <>
            {data.map(item => {
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
                                                    rules={{ required: 'Выбирите ' + item.name }}
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
                                                                {(mark.children?.sort((a, b) => a.value > b.value ? 1 : -1))?.map((item, i) => (
                                                                    <MenuItem key={i} value={item.value}>
                                                                        {item.value}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>
                                                        )}
                                                        rules={{ required: 'Выбирите ' + item.name }}
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
                                                        rules={{ required: 'Выбирите ' + item.name }}
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
                                                        rules={{ required: 'Выбирите ' + item.name }}
                                                    />
                                                </Box>
                                            </Box>
                                        }
                                        {fullDescription &&
                                            fullDescription.map((item) => {
                                                //Вывод доп полей
                                                switch (typeof item.value) {
                                                    case 'object':
                                                        switch (item.alias) {
                                                            case 'complectations':
                                                                if (item.value.length === 1) {
                                                                    return (
                                                                        <Box className={classes.formInputMainField_text}>
                                                                            <Typography className={classes.formTitleField}>{item.name}</Typography>
                                                                            <Box className={classes.formInputField}>
                                                                                <Controller
                                                                                    name={item.alias}
                                                                                    className={classes.input}
                                                                                    defaultValue={item.value[0].value}
                                                                                    control={methods.control}
                                                                                    render={({ field: { onChange, value } }) => (
                                                                                        <TextField
                                                                                            className={classes.input}
                                                                                            variant='outlined'
                                                                                            value={value}
                                                                                            onChange={onChange}
                                                                                            InputProps={{
                                                                                                readOnly: true,
                                                                                            }}
                                                                                        />

                                                                                    )}
                                                                                />
                                                                            </Box>
                                                                        </Box>
                                                                    )
                                                                } else {
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
                                                                                                <MenuItem key={i} value={item.value}>
                                                                                                    {item.value}
                                                                                                </MenuItem>
                                                                                            )}
                                                                                        </TextField>
                                                                                    )}
                                                                                    rules={{ required: 'Выбирите Комплектацию' }}
                                                                                />
                                                                            </Box>
                                                                        </Box>
                                                                    );
                                                                }
                                                            default:
                                                                if (item.value.length === 1) {
                                                                    return (
                                                                        <Box className={classes.formInputMainField_text}>
                                                                            <Typography className={classes.formTitleField}>{item.name}</Typography>
                                                                            <Box className={classes.formInputField}>
                                                                                <Controller
                                                                                    name={item.alias}
                                                                                    className={classes.input}
                                                                                    control={methods.control}
                                                                                    defaultValue={item.value[0]}

                                                                                    render={({ field: { onChange, value } }) => (
                                                                                        <TextField
                                                                                            className={classes.input}
                                                                                            variant='outlined'
                                                                                            value={value}
                                                                                            onChange={onChange}

                                                                                            InputProps={{
                                                                                                readOnly: true,
                                                                                            }}
                                                                                        />

                                                                                    )}
                                                                                />
                                                                            </Box>
                                                                        </Box>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <Box className={classes.formInputMainField}>
                                                                            <Typography className={classes.formTitleField}>{item.name}</Typography>
                                                                            <Box className={classes.formInputField}>
                                                                                <Controller
                                                                                    name={item.alias}
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
                                                                                    rules={{ required: 'Выбирите ' + item.name }}
                                                                                />
                                                                            </Box>
                                                                        </Box>
                                                                    );
                                                                }
                                                        }


                                                    default:
                                                        if (item.alias !== 'yearfrom' && item.alias !== 'yearto') {
                                                            return (
                                                                <Box className={classes.formInputMainField_text}>
                                                                    <Typography className={classes.formTitleField}>{item.name}</Typography>
                                                                    <Box className={classes.formInputField}>
                                                                        <Controller
                                                                            name={item.alias}
                                                                            className={classes.input}
                                                                            control={methods.control}
                                                                            defaultValue={item.value}
                                                                            render={({ field: { onChange, value } }) => (
                                                                                <TextField
                                                                                    className={classes.input}
                                                                                    variant='outlined'
                                                                                    value={value}
                                                                                    onChange={onChange}
                                                                                    InputProps={{
                                                                                        readOnly: true,
                                                                                    }}
                                                                                />

                                                                            )}
                                                                        />
                                                                    </Box>
                                                                </Box>)
                                                        }
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
                                                        {item.fields.map((item, i) => (
                                                            <MenuItem key={i} value={item}>
                                                                {item}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                )}
                                                rules={{ required: 'Выбирите ' + item.name }}
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
                }
            })
            }
            <Box className={classes.formInputMainField}>
                <Typography className={classes.formTitleField}>Цвет</Typography>
                <Box className={classes.formColorMain}>
                    {
                        ColorAuto.map(item => (
                            <Box key={item.value}>
                                <Box  className={classes.formColor} style={{ background: item.value, border: item.value === '#FFFFFF' ? '1px solid #5A5A5A' : '' }} ></Box>
                            </Box>
                        )
                        )
                    }
                </Box>
            </Box>
        </>
    )
}


