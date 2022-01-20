import {Box, makeStyles, TextField, Typography} from "@material-ui/core";
import {Controller, useFormContext} from "react-hook-form";
import {OnlyNumbersMask} from "../../lib/onlyNumbersMask";
// import {useEffect} from "react";
// import {useRouter} from "next/router";

const useStyles = makeStyles((theme) => ({
    formBox: {
        marginBottom: 24,
        [theme.breakpoints.down(960)]: {
            marginBottom: '15px'
        }
    },
    formInputField: {
        display: "flex",
    },
    formTitle: {
        // marginLeft: 8,
        fontWeight: 500,
        fontSize: 14,
        color: "#2C2C2C",
        [theme.breakpoints.down(960)]: {
            fontSize: 16,
            lineHeight: '18.75px',
            color: '#2C2C2C',
            fontWeight: 700,
            marginBottom: '15px',
            marginLeft: 2
        }
    },
    input: {
        "&:last-of-type": {
            marginLeft: 0,
        },
        "& .MuiOutlinedInput-input": {
            paddingLeft: 8,
        },
        [theme.breakpoints.down(960)]: {
            "& .MuiOutlinedInput-input": {
                paddingLeft: 15,
            },
        }
    },
    inputActuve: {
        "& .MuiOutlinedInput-input": {
            paddingLeft: 28,
            maxWidth: 139,
        },
    },
    tooltip: {
        position: "absolute",
        top: 8,
    },
    inputs: {
        position: "relative",
        maxWidth: "50%",
        marginTop: '8px',
        [theme.breakpoints.down(960)]: {
            marginTop: '0'
        }
    },

    firstInputs: {
        marginRight: '8px',
        [theme.breakpoints.down(960)]: {
            marginRight: '10px'
        }
    },
    root: {
        [theme.breakpoints.down(960)]: {
            '& > div > fieldset': {
                borderRadius: '5px',
                border: '1px solid #C7C7C7'
            }
        }
    }
}));

const FilterTwoFields = ({data, unmount}) => {
    const classes = useStyles();
    const methods = useFormContext();
    // const router = useRouter();

    // useEffect(() => {
    //     if (data.firstAlias === 'fromPrice' && data.secondAlias === 'toPrice') {
    //         // if (Object.keys(router.query).length) {
    //         //     if (!router.query?.fromPrice) {
    //         //         methods.setValue(data.firstAlias, '')
    //         //     }
    //         //
    //         //     if (!router.query?.toPrice) {
    //         //         methods.setValue(data.secondAlias, '')
    //         //     }
    //         // }
    //
    //     }
    // }, [router])




    return (
        <Box className={classes.formBox}>
            <Typography className={classes.formTitle}>{data.title}</Typography>
            <Box className={classes.formInputField}>
                <Box className={`${classes.inputs} ${classes.firstInputs}`}>
                    <Controller
                        name={data.firstAlias}
                        control={methods.control}
                        defaultValue=""
                        shouldUnregister={unmount}
                        render={({field: {onChange, value}}) => (
                            <>
                                <TextField
                                    className={`${classes.input} ${
                                        value?.length && value.length < 8 ? classes.inputActuve : ""
                                    }`}
                                    classes={{root: classes.root}}
                                    variant="outlined"
                                    value={value ? value : ''}
                                    placeholder="от"
                                    onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                                    onBlur={(e) => {
                                        const watchInput = methods.watch(data.secondAlias)
                                        // console.log(+e.target.value, +watchInput)
                                        if (+e.target.value > +watchInput && +watchInput !== 0) {
                                            console.log(+e.target.value, +watchInput);
                                            methods.setValue(data.firstAlias, '')
                                        }
                                    }}
                                />
                                {value?.length && value.length < 8 ? (
                                    <span className={classes.tooltip} style={{left: 8}}>
                    от
                  </span>
                                ) : null}
                            </>
                        )}
                    />
                </Box>
                <Box className={classes.inputs}>
                    <Controller
                        name={data.secondAlias}
                        shouldUnregister={unmount}
                        control={methods.control}
                        defaultValue=""
                        render={({field: {onChange, value}}) => (
                            <>
                                <TextField
                                    className={`${classes.input} ${
                                        value?.length && value.length < 8 ? classes.inputActuve : ""
                                    }`}
                                    classes={{root: classes.root}}
                                    variant="outlined"
                                    value={value ? value : ''}
                                    placeholder="до"
                                    onChange={(e) => onChange(OnlyNumbersMask(e, "num"))
                                    }
                                    onBlur={(e) => {
                                        const watchInput = methods.watch(data.firstAlias)
                                        console.log(+e.target.value < +watchInput)
                                        if (+e.target.value < +watchInput && +watchInput !== 0) {
                                            methods.setValue(data.secondAlias, '')
                                        }
                                    }}
                                />
                                {value?.length && value.length < 8 ? (
                                    <span className={classes.tooltip} style={{left: 8}}>
                    До
                  </span>
                                ) : null}
                            </>
                        )}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default FilterTwoFields;
