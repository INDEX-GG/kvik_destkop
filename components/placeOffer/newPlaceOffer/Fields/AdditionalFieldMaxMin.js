import React, {useEffect} from 'react';
import AdditionalWrapper from "#components/placeOffer/newPlaceOffer/AdditionalWrapper";
import {Controller, useFormContext} from "react-hook-form";
import {TextField, MenuItem, makeStyles, useMediaQuery, RadioGroup, FormControlLabel, Radio} from "@material-ui/core";
import OutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import Filledicon from "@material-ui/icons/Brightness1";


const useStyles = makeStyles((theme) => ({
    input: {
        [theme.breakpoints.down(960)]: {
            width: '100%'
        }
    }
}));


const AdditionalFieldTextListJson = ({fieldObj}) => {

    const {control, getValues, setValue, watch} = useFormContext();
    const classes = useStyles();

    const {alias, type, title, default_filter_arr, filter_title} = fieldObj
    const media960 = useMediaQuery('(max-width: 960px)')

    useEffect(() => {
        const currentValue = getValues(alias)
        if (currentValue) {
            try {
                setValue(alias, JSON.parse(currentValue)?.name)
            } catch (e) {
                console.log('.')
            }
        }
    }, [watch(alias)])


    return (
        <AdditionalWrapper title={filter_title ? filter_title : title} type={type}>
            {!media960 ? (
                <Controller
                    name={alias}
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <TextField
                            select
                            className={classes.input}
                            variant='outlined'
                            value={value}
                            onChange={onChange}>
                            {default_filter_arr.map(item => (
                                <MenuItem key={item} value={item}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />
            ) : (
                <Controller
                    name={alias}
                    control={control}
                    defaultValue=""
                    render={({field: {onChange, value}}) => (
                        <RadioGroup
                            // className={classes.check}
                            value={value}
                            defaultValue={value}
                            onChange={e => onChange(JSON.parse(e.target.value))}>
                            {default_filter_arr.map((item, index) => (
                                <FormControlLabel
                                    key={index}
                                    label={item.name}
                                    value={JSON.stringify(item.data)}
                                    // className={classes.item}
                                    control={
                                        <Radio
                                            checked={item.data?.min === value?.min}
                                            // className={classes.checkbox}
                                            color="primary"
                                            icon={<OutlinedIcon fontSize="inherit"/>}
                                            checkedIcon={<Filledicon fontSize="inherit"/>}
                                        />
                                    }
                                />
                            ))}
                        </RadioGroup>
                    )}
                    rules={{required: ''}}
                />
            )}
        </AdditionalWrapper>
    );
};

export default AdditionalFieldTextListJson;