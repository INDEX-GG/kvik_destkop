import {
    Box,
    FormControlLabel,
    makeStyles,
    Radio,
    RadioGroup,
    Typography,
} from "@material-ui/core";
import {Controller, useFormContext} from "react-hook-form";
import OutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import Filledicon from "@material-ui/icons/Brightness1";

const useStyles = makeStyles(() => ({
    formBox: {
        margin: "24px 0",
    },
    formInputField: {
        display: "flex",
    },
    formTitle: {
        marginBottom: 3,
        fontWeight: 500,
        fontSize: 14,
        color: "#2C2C2C",
    },
    input: {
        // margin: "8px",
        "&:last-child": {
            marginLeft: 0,
        },
    },
    checkboxes: {
        display: "flex",
        flexDirection: "column",
        // padding: "0 8px"
    },
    check: {
        marginLeft: 0,
        "&>.MuiFormControlLabel-root": {
            marginLeft: 0,
        },
        "& .MuiFormControlLabel-label": {
            fontSize: 14
        }
    },
    checkbox: {
        padding: "4px 4px 4px 0",
        fontSize: 18,
    },

}));

const FilterRadio = ({data}) => {
    const classes = useStyles();
    const methods = useFormContext();


    return (
        <Box className={classes.formBox}>
            <Typography className={classes.formTitle}>{data.title}</Typography>
            <Box className={classes.checkboxes}>
                <Controller
                    name={data.alias}
                    control={methods.control}
                    defaultValue=""
                    render={({field: {onChange, value}}) => (
                        <RadioGroup
                            className={classes.check}
                            value={value}
                            defaultValue={value}
                            onChange={(e) => onChange(e.target.value)}
                        >
                            {data.fields.map((el, i) => (
                                <FormControlLabel
                                    key={i}
                                    label={el}
                                    value={el}
                                    control={
                                        <Radio
                                            className={classes.checkbox}
                                            color="primary"
                                            icon={<OutlinedIcon fontSize="inherit"/>}
                                            checkedIcon={<Filledicon fontSize="inherit"/>}
                                        />
                                    }
                                />
                            ))}
                        </RadioGroup>
                    )}
                />
            </Box>
        </Box>
    );
};

export default FilterRadio;
