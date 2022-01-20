import React from 'react';
import {FormControl, FormControlLabel, makeStyles, Radio, RadioGroup} from "@material-ui/core";
import {Controller, useFormContext} from "react-hook-form";
import OutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import Filledicon from "@material-ui/icons/Brightness1";


const useStyles = makeStyles(() => ({
    wrapper: {
        marginTop: '1px',
        paddingLeft: '17px'
    },
    text: {
        fontSize: '18px',
        color: '#2C2C2C',
        fontWeight: '500',
        lineHeight: '21px',
        marginLeft: '17px'
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
    },
    button: {
        borderRadius: '50%',
        width: '27px',
        height: '27px',
        cursor: 'pointer',
        border: '1px solid black',
        backgroundColor: '#fff',
        transition: '.2s all linear'
    },
    active: {
        backgroundColor: '#00A0AB',
    }
}));


const TextListModal = ({data}) => {

    const classes = useStyles();
    const {control} = useFormContext()

    const {alias, dataItems, required} = data


    return (
        <FormControl component='div' className={classes.wrapper}>
            <Controller
                name={alias}
                control={control}
                defaultValue=""
                rules={{required: required?.state ? required.value : false}}
                render={
                    ({field: {onChange, value}}) => (
                        <RadioGroup
                            name={alias}
                            value={value}
                            defaultValue={value}
                            onChange={(e) => onChange(e.target.value)}
                        >
                            {dataItems.map((item, index) => {

                                const fieldValue = item?.props?.value ? item?.props?.value : item

                                return (
                                    (
                                        <FormControlLabel
                                            key={index}
                                            label={fieldValue}
                                            value={fieldValue}
                                            className={classes.item}
                                            control={
                                                <Radio
                                                    checked={value == fieldValue}
                                                    // className={classes.checkbox}
                                                    color="primary"
                                                    icon={<OutlinedIcon fontSize="inherit"/>}
                                                    checkedIcon={<Filledicon fontSize="inherit"/>}
                                                />
                                            }
                                        />
                                    )
                                )
                            })}
                        </RadioGroup>
                    )}
            />
        </FormControl>
    );
};

export default TextListModal;