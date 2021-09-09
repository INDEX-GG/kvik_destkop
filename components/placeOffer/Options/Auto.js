import { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, makeStyles, TextField, Typography, MenuItem, Checkbox } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import axios from 'axios';
import ColorAuto from '../../json/color.json'
import { OnlyNumbersMask, cursorReplace } from '../../../lib/onlyNumbersMask';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import OutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import Filledicon from '@material-ui/icons/Brightness1';

const useStyles = makeStyles((theme) => ({
    formInputMainField: {
        display: 'flex',
    },
    formInputMainField_text: {
        display: 'flex',
        marginBottom: '19px',
        alignItems: 'center',
    },
    formInputMainField_list: {
        display: 'flex',
        marginBottom: '19px',
        alignItems: 'center',
    },
    formInputMainField_checkbox: {
        display: 'flex',
    },
    formElem: {
        marginBottom: theme.spacing(3),
    },
    formTitleField: {
        flex: '1 1',
        padding: '4px 0',
        minWidth: '158px',
        maxWidth: '158px',
        fontSize: '14px',
        paddingRight: '15px',
    },
    formInputField: {
        width: '490px',
    },
    formInputFieldCheck: {
        width: '490px',
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: '16px',
        padding: '4px 0',
    },
    check: {
        width: '48%',
        margin: '0',
        alignItems: 'start',
        height: '50px',
        '& span': {
            padding: '0',
            fontSize: '14px',
            display: "flex",
            marginRight: '4px',
        }
    },
    check_more: {
        paddingLeft: '20px',
        margin: '0',
        marginRight: '4px',
        '& span': {
            padding: '0',
            fontSize: '14px',
            marginLeft: '4px',
        }
    },
    input: {
        width: '264px',
    },
    formColorMain: {
        width: '490px',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    formColorWrapper: {
        width: '30px',
        height: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2px',
    },
    formColorWrapperActive: {
        border: '1px solid #5A5A5A',
        borderRadius: '50%',
        width: '30px',
        height: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2px',
    },
    formColor: {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        cursor: 'pointer',
    },
    formRadioColor: {
        opacity: '0',
        padding: '0',
    },
    formError: {
        color: '#F44545',
        marginLeft: '14px',
        marginRight: '14px',
    },
}));

export default function Auto({ data }) {

    const classes = useStyles();
    const methods = useFormContext();
    const [mark, setMark] = useState(),
        [model, setModel] = useState(undefined),
        [generation, setGeneration] = useState(undefined),
        [generationUnical, setGenerationUnical] = useState(undefined),
        [modification, setModification] = useState(undefined),
        [fullDescription, setFullDescription] = useState(undefined),
        [color, setColor] = useState(false);

    useEffect(() => {
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
        setFullDescription(undefined)

        if (mark != undefined) {
            setModel(mark.children.filter(item => item.value === methods.watch('submodels')).map(item => item.children.map(item => item)))
        }
    }, [methods.watch('submodels')])

    useEffect(() => {
        setModification(undefined)
        setFullDescription(undefined)
        setGeneration(undefined)
        if (model != undefined) {
            let gen = model.map((item) => item.filter((item) => item.value === methods.watch('generation')))
            setGenerationUnical([...new Set((gen[0][0].children.sort((a, b) => a.value > b.value ? 1 : -1)).map(item => item.value))])
            setGeneration(gen)
        }
    }, [methods.watch('generation')])

    useEffect(() => {
        if (generation != undefined) {
            setModification(undefined)
            let arr = []
            let mod = (generation[0].map(item => item.children.map(item => item)));
            arr = ((mod[0].filter(item => item.value === methods.watch('modification'))).map(item => item))
            console.log(arr)
            setModification(arr.map(item => item.children))
        }
    }, [methods.watch('modification')])

    useEffect(() => {
        console.log('modification', modification)
        let newObjdrivetype = [],
            newObjBodytype = [],
            newObjDoors = [],
            newObjcomplectations = [],
            newObjyear = [],
            n,
            m,
            mainObj = []

        methods.unregister('year', '');
        methods.unregister('fueltype', '');
        methods.unregister('drivetype', '');
        methods.unregister('transmission', '');
        methods.unregister('power', '');
        methods.unregister('enginesize', '');
        methods.unregister('bodytype', '');
        methods.unregister('doors', '');
        methods.unregister('complectations', '');

        if (modification != undefined) {
            n = ((modification[0].filter(item => item.alias === 'yearfrom').map(item => +item.value)))[0];
            m = ((modification[0].filter(item => item.alias === 'yearto').map(item => +item.value)))[0];
            for (var i = n; i <= m; i++) {
                newObjyear.push(i)
            }

            for (let i = 0; i < modification.length; i++) {
                newObjdrivetype.push(...modification[i].filter(item => item.alias === 'drivetype').map(item => item.value))
                newObjBodytype.push(...modification[i].filter(item => item.alias === 'bodytype').map(item => item.value))
                newObjDoors.push(...modification[i].filter(item => item.alias === 'doors').map(item => +item.value))
                newObjcomplectations.push(...modification[i].filter(item => item.alias === 'complectations').map(item => item.value))
            }

            mainObj.push({ alias: "year", name: "Год выпуска", value: newObjyear });
            mainObj.push({ alias: "fueltype", name: "Тип двигателя", value: modification[0].filter(item => item.alias === 'fueltype')[0].value });
            mainObj.push({ alias: "drivetype", name: "Привод", value: [...new Set(newObjdrivetype)] })
            mainObj.push({ alias: "transmission", name: "Коробка передач", value: modification[0].filter(item => item.alias === 'transmission')[0].value })
            mainObj.push({ alias: "power", name: "Мощность", value: +modification[0].filter(item => item.alias === 'power')[0].value })
            mainObj.push({ alias: "enginesize", name: "Объем двигателя", value: +modification[0].filter(item => item.alias === 'enginesize')[0].value })
            mainObj.push({ alias: "bodytype", name: "Тип кузова", value: [...new Set(newObjBodytype)] })
            mainObj.push({ alias: "doors", name: "Количество дверей", value: [...new Set(newObjDoors)] })
            mainObj.push({ alias: "complectations", name: "Комплектация", value: modification[0].filter(item => item.alias === 'complectations')[0].complectations = [...new Set(newObjcomplectations.flat().map(item => item.value))] })

            console.log(mainObj)

            setFullDescription(mainObj)
        }
    }, [modification])

    //     console.log('mark +++++', mark)
    //     console.log('model +++++', model)
    //     console.log('generation +++++', generation)
    //     console.log('generationUnical +++++', generationUnical)
    //     console.log('modification +++++', modification && modification)
    //     console.log('fullDescription +++++', fullDescription && fullDescription)
    // console.log(methods.watch('generation'))
    return (
        <>
            {data.map((item) => {
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
                                                            onClick={() => {
                                                                setGeneration(undefined);
                                                                setGenerationUnical(undefined);
                                                                setModification(undefined);
                                                                setModel(undefined);
                                                                setFullDescription(undefined);
                                                                methods.unregister('generation', undefined);
                                                            }}
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

                                        {
                                            mark &&
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
                                        {
                                            model &&
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

                                        {
                                            generationUnical &&
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

                                        {
                                            fullDescription &&
                                            fullDescription.map((item) => {
                                                //Вывод доп полей
                                                switch (typeof item.value) {
                                                    case 'object':
                                                        switch (item.alias) {
                                                            case 'complectations':
                                                                if (item.value.length === 1) {
                                                                    return (
                                                                        <Box key={item.name} className={classes.formInputMainField_text}>
                                                                            <Typography className={classes.formTitleField}>{item.name}</Typography>
                                                                            <Box className={classes.formInputField}>
                                                                                <Controller
                                                                                    name={item.alias}
                                                                                    className={classes.input}
                                                                                    control={methods.control}
                                                                                    defaultValue={item.value[0]}
                                                                                    render={({ field: { onChange } }) => (
                                                                                        <TextField
                                                                                            className={classes.input}
                                                                                            variant='outlined'
                                                                                            value={item.value[0]}
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
                                                                        <Box key={item.name} className={classes.formInputMainField}>
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
                                                                                    rules={{ required: 'Выбирите Комплектацию' }}
                                                                                />
                                                                            </Box>
                                                                        </Box>
                                                                    );
                                                                }
                                                            default:
                                                                if (item.value.length === 1) {
                                                                    return (
                                                                        <Box key={item.name} className={classes.formInputMainField_text}>
                                                                            <Typography className={classes.formTitleField}>{item.name}</Typography>
                                                                            <Box className={classes.formInputField}>
                                                                                <Controller
                                                                                    name={item.alias}
                                                                                    className={classes.input}
                                                                                    control={methods.control}
                                                                                    defaultValue={item.value[0]}
                                                                                    render={({ field: { onChange } }) => (
                                                                                        <TextField
                                                                                            className={classes.input}
                                                                                            variant='outlined'
                                                                                            value={item.value[0]}
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
                                                                        <Box key={item.name} className={classes.formInputMainField}>
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
                                                        return (
                                                            <Box key={item.name} className={classes.formInputMainField_text}>
                                                                <Typography className={classes.formTitleField}>{item.name}</Typography>
                                                                <Box className={item.alias === 'fueltype' ? "" : classes.formInputField}>
                                                                    <Controller
                                                                        name={item.alias}
                                                                        className={classes.input}
                                                                        control={methods.control}
                                                                        value={item.value}
                                                                        defaultValue={item.value}
                                                                        render={({ field: { onChange } }) => (
                                                                            <TextField
                                                                                className={classes.input}
                                                                                variant='outlined'
                                                                                value={item.value}
                                                                                onChange={onChange}
                                                                                InputProps={{
                                                                                    readOnly: true,
                                                                                }}
                                                                            >{item.value}</TextField>
                                                                        )}
                                                                    />
                                                                </Box>

                                                                {item.alias === 'fueltype' ? (
                                                                    <Controller
                                                                        key={item.name}
                                                                        defaultValue={false}
                                                                        value={false}
                                                                        render={({ field }) => (
                                                                            <FormControlLabel
                                                                                {...field}
                                                                                className={classes.check_more}
                                                                                control={
                                                                                    <Checkbox
                                                                                        color='primary'
                                                                                        icon={<OutlinedIcon />}
                                                                                        checkedIcon={<Filledicon />}
                                                                                        type="checkbox"
                                                                                    />
                                                                                }
                                                                                label='ГБО'
                                                                            />
                                                                        )}
                                                                        name='GBO'
                                                                        control={methods.control}
                                                                    />)
                                                                    : ''
                                                                }
                                                            </Box>
                                                        )
                                                }
                                            })
                                        }
                                    </>
                                )
                            default:

                                return (
                                    <Box key={item.name} className={classes.formInputMainField}>
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
                                                        {item.fields?.map((item, i) => (
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
                        return (
                            <Box key={item.name} className={classes.formInputMainField_list}>
                                <Typography className={classes.formTitleField}>{item.name}</Typography>
                                <Box className={classes.formInputField}>
                                    <Controller
                                        name={item.alias}
                                        control={methods.control}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                select
                                                className={classes.input}
                                                variant='outlined'
                                                value={value}
                                                onChange={onChange}>
                                                {item.fields?.map((item, i) => (
                                                    <MenuItem key={i} value={item}>
                                                        {item}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        )}
                                    />
                                </Box>
                            </Box>
                        )

                    case 'textRec':
                        return (
                            <Box key={item.name} className={classes.formInputMainField}>
                                <Typography className={classes.formTitleField}>{item.name}</Typography>
                                <Box className={classes.formInputField}>
                                    <Controller
                                        name={item.alias}
                                        control={methods.control}
                                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                                            <TextField
                                                className={classes.input}
                                                variant='outlined'
                                                value={value}
                                                onKeyDown={e => cursorReplace(e, item.name)}
                                                onChange={e => onChange(OnlyNumbersMask(e, item.name))}
                                                error={!!error}
                                                helperText={error ? error.message : ' '}>
                                            </TextField>
                                        )}
                                        rules={{ required: 'Выбирите ' + item.name }}
                                    />
                                </Box>
                            </Box>
                        )

                    case 'text':
                        return (
                            fullDescription && (
                                <Box key={item.name} className={classes.formInputMainField_text}>
                                    <Typography className={classes.formTitleField}>{item.name}</Typography>
                                    <Box className={classes.formInputField}>
                                        <Controller
                                            name={item.alias}
                                            control={methods.control}
                                            render={({ field: { onChange, value } }) => (
                                                <TextField
                                                    className={classes.input}
                                                    variant='outlined'
                                                    value={value}
                                                    onKeyDown={e => cursorReplace(e, item.name)}
                                                    onChange={e => onChange(OnlyNumbersMask(e, item.name))}>
                                                </TextField>
                                            )}
                                        />
                                    </Box>
                                </Box>
                            )
                        )

                    case 'checkboxRec':
                        break;

                    case 'checkbox':
                        return (
                            fullDescription && (
                                <Box key={item.name} className={classes.formInputMainField_checkbox}>
                                    <Typography className={classes.formTitleField}>{item.name}</Typography>
                                    <Box className={classes.formInputFieldCheck}>
                                        {item.fields.map((item2, i) => {
                                            return (
                                                <Controller
                                                    key={i}
                                                    defaultValue={false}
                                                    value={false}
                                                    render={({ field }) => (
                                                        <FormControlLabel
                                                            {...field}
                                                            className={classes.check}
                                                            control={
                                                                <Checkbox
                                                                    color='primary'
                                                                    icon={<OutlinedIcon />}
                                                                    checkedIcon={<Filledicon />}
                                                                    type="checkbox"
                                                                />
                                                            }
                                                            label={item2}
                                                        />
                                                    )}
                                                    name={item.alias + [i]}
                                                    control={methods.control}
                                                />

                                            )
                                        })}
                                    </Box>
                                </Box>
                            )
                        )
                    case 'radio':
                        break;
                    default:
                }
            })
            }

            {
                fullDescription && (
                    <Box className={classes.formInputMainField}>
                        <Typography className={classes.formTitleField}>Цвет</Typography>
                        <Box className={classes.formInputField}>
                            <Controller
                                name="color"
                                control={methods.control}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <RadioGroup
                                        variant='outlined'
                                        value={value}
                                        error={!!error}
                                        className={classes.formColorMain}
                                        onChange={(e) => onChange(e.target.value)}>
                                        {ColorAuto.map((item, i) => (
                                            <Box className={color === i ? classes.formColorWrapperActive : classes.formColorWrapper} key={item.name}>
                                                <Box className={classes.formColor} onClick={() => setColor(i)} style={{ background: item.value, border: item.value === '#FFFFFF' ? '1px solid #5A5A5A' : '' }} ><Radio className={classes.formRadioColor} value={item.id}></Radio></Box>
                                            </Box>
                                        ))}
                                        <FormHelperText className={classes.formError}>{error ? error.message : ' '}</FormHelperText>
                                    </RadioGroup>
                                )}
                                rules={{ required: 'Выбирите цвет' }}
                            />
                        </Box>
                    </Box>
                )
            }
        </>
    )
}


