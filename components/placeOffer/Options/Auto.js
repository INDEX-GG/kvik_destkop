import { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, makeStyles, TextField, Typography, MenuItem } from '@material-ui/core';
import axios from 'axios';
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';


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

    const classes = useStyles();
    const methods = useFormContext();

    console.log(methods.watch('modelsAuto'))
    console.log(methods.watch('submodels'))
    console.log(methods.watch('generation'))
    console.log(methods.watch('modification'))

    const [mark, setMark] = useState(),
        [model, setModel] = useState(),
        [generation, setGeneration] = useState(),
        [modification, setModification] = useState(),
        [fullDescription, setFullDescription] = useState();




    useEffect(() => {
        if (methods.watch('modelsAuto') != undefined) {
            axios.get(`/auto_brand/` + (methods.watch('modelsAuto')) + `.json`)
                .then((result) => setMark(result.data))
                .catch((e) => console.log(e))
        }
    }, [methods.watch('modelsAuto')])



    useEffect(() => {
        if (mark != undefined) {
            setModel(mark.children.filter(item => item.value === methods.watch('submodels')).map((item, i) => item.children.map((item, i) => item)))
        }
    }, [methods.watch('submodels')])


    useEffect(() => {
        if (model != undefined) {
            setGeneration(model.map((item, i) => item.filter((item, i) => item.value === methods.watch('generation'))))
        }
    }, [methods.watch('generation')])



    useEffect(() => {
        if (generation != undefined) {
            console.log('11111111111')
            let arr = []
            let mod = (generation[0].map((item, i) => item.children.map((item, i) => item)));
            arr = ((mod[0].filter((item, i) => item.value === methods.watch('modification'))).map((item, i) => item))
            let objs = {}
            for (let i = 0; i < arr.length; i++) {
                // objs = { ...arr[i].children.map((item, i) => item), ...arr[i + 1].children.map((item, i) => item) }           
                // setModification({...arr[i].children.map((item, i) => item)})
            }
            console.log(objs)

            console.log('======>', setModification(arr.map((item, i) => item.children)))
            // setModification()
            // console.log(generation[0].map((item, i) => item.children.map((item, i) => item)))
            // console.log(methods.watch('generation'))
        }
    }, [methods.watch('modification')])

    // useEffect(() => {
    //     console.log('2222222222222')
    //     if (modification != undefined) {
    //         console.log(modification)
    //         setFullDescription(modification && modification[0].filter((item, i) => (item.value === methods.watch('modification'))))
    //         console.log(methods.watch('modification'))
    //     }
    // }, [methods.watch('modification')])
    // console.log(modification && (modification[0].filter((item, i) => item.value === methods.watch('modification'))))

    if (modification != undefined) {
        console.log('+++++++++++++++++++++++++++++++')

        let newObjMain = []
        for (let i = 0; i < modification.length; i++) {
            newObjMain.push({ alias: modification.map((item, i) => item[0].value) })
        }

        console.log(newObjMain)
        console.log(modification[0].length)
        console.log(modification.map((item, i) => (item[0].value)))

    }




    return (

        data.map((item, i) => {
            switch (item.type) {
                case 'listRec':
                    switch (item.alias) {
                        case 'marks':
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
                                                            {(mark.children.sort((a, b) => a.value > b.value ? 1 : -1)).map((item, i) => (
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
                                        <Box className={classes.formInputMainField}>
                                            <Typography className={classes.formTitleField}>Поколение</Typography>
                                            <Box className={classes.formInputField}>
                                                {console.log(model.map((item, i) => (item.sort((a, b) => a.value > b.value ? 1 : -1)).map((item, i) => item.value)))}
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
                                                            {model.map((item, i) => item.map((item, i) => (
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

                                    {generation &&
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
                                                            {generation[0].map((item, i) => item.children.map((item, i) => (
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
                                    {/*  {modification &&
                                        (modification[0].filter((item, i) => item.value === methods.watch('modification'))).map((item, i) => (


                                            item.children.map((item, i) =>
                                                // eslint-disable-next-line react/jsx-key
                                                <Box className={classes.formInputMainField}>
                                                    <Typography className={classes.formTitleField}>{item.alias}</Typography>
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
                                                </Box>
                                            )
                                        ))
                                    } */}

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


