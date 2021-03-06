import {
    Box,
    Checkbox,
    FormGroup,
    makeStyles,
    Tooltip,
    Typography,
} from "@material-ui/core";
import {Controller, useFormContext} from "react-hook-form";
import {useEffect, useState} from "react";
import colorsData from '../../components/json/color.json'


const useStyles = makeStyles(() => ({
    formBox: {
        margin: "24px 0",
    },
    formInputField: {
        display: "flex",
        padding: '4px 0px 0 0px'
    },
    formTitle: {
        fontWeight: 500,
        fontSize: 14,
        color: "#2C2C2C",
    },
    input: {
        margin: "8px",
        "&:last-child": {
            marginLeft: 0,
        },
    },
    checkboxes: {
        display: "flex",
        flexDirection: "column",
        padding: "0 8px"
    },
    check: {
        marginLeft: 0,
        "&>.MuiFormControlLabel-root": {
            marginLeft: 0,
        },
        "& .MuiFormControlLabel-label": {
            fontSize: 14,
        },
    },
    checkbox: {
        // padding: "4px 4px 4px 0",
        fontSize: 18,
    },
    formColorMain: {
        width: '490px',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    tooltip: {
        border: "#8F8F8F solid 1px",
        background: "#FFFFFF",
        color: "#5A5A5A",
        fontSize: "12px",
    },
    arrow: {
        color: '#FFFFFF',
        "&:before": {
            border: "#8F8F8F solid 1px",
        }
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
}));

const FilterColor = ({alias, title}) => {
    const classes = useStyles();
    const methods = useFormContext();
    const [colors, setColors] = useState([]);
    const defaultColor = methods.getValues('color')


    const handleChange = (value, onChange) => {
        setColors(col => {
            if (col.includes(value)) {
                onChange(col.filter(el => el !== value))
                return col.filter(el => el !== value)
            }
            onChange([...col, value])
            return [...col, value]
        })
    }


    useEffect(() => {
        if (methods.watch(alias) === undefined) {
            setColors([])
        }
    }, [methods.watch(alias)])


    useEffect(() => {
        if (defaultColor !== colors && !colors.length && defaultColor) {
            if (Array.isArray(defaultColor)) {
                setColors(defaultColor.map(item => +item))
            } else {
                setColors([+defaultColor])
            }
        }
    }, [defaultColor])

    return (
        <Box className={classes.formBox}>
            <Typography className={classes.formTitle}>{title}</Typography>
            <Box className={classes.formInputField}>
                <Controller
                    name={alias}
                    defaultValue={[]}
                    control={methods.control}
                    render={({field: {onChange, value}}) => (
                        <FormGroup
                            variant="outlined"
                            value={value}
                            defaultValue={value}
                            className={classes.formColorMain}
                        >
                            {colorsData.map((item, i) => (
                                <Tooltip
                                    key={i}
                                    arrow
                                    placement="top"
                                    title={item.name}
                                    classes={{tooltip: classes.tooltip, arrow: classes.arrow}}
                                >
                                    <Box
                                        className={
                                            colors.includes(i)
                                                ? classes.formColorWrapperActive
                                                : classes.formColorWrapper
                                        }
                                    >
                                        <Box
                                            className={classes.formColor}
                                            onClick={() => handleChange(i, onChange)}
                                            style={{
                                                background: item.value,
                                                border:
                                                    item.value === "#FFFFFF" ? "1px solid #5A5A5A" : "",
                                            }}
                                        >
                                            <Checkbox
                                                className={classes.formRadioColor}
                                                value={item.id}
                                            />
                                        </Box>
                                    </Box>
                                </Tooltip>
                            ))}
                        </FormGroup>
                    )}
                />
            </Box>
        </Box>
    );
};

export default FilterColor;
