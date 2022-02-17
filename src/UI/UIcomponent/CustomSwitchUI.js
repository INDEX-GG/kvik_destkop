import React from 'react';
import {FormControlLabel, makeStyles, Switch} from "@material-ui/core";

const CustomSwitchUI = ({label, checked, handleChangeSwitch}) => {
    const classes = useStyles();


    return (
        <FormControlLabel
            label={label}
            classes={{
                label: classes.label
            }}
            control=
                {<Switch
                    checked={checked}
                    onChange={handleChangeSwitch}
                    color='primary'
                    size='medium'
                    inputProps={{ 'aria-label': 'controlled' }}
                    classes={{thumb: classes.thumb, track: classes.track}}
                />}
        />
    );
};

const useStyles = makeStyles(() => ({
    thumb: {
        backgroundColor: 'rgba(0, 0, 0, 0,15)',
        boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.15)',
    },
    track: {
        backgroundColor: '#C7C7C7'
    },
    label: {
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '18.75px'
    }
}));

export default CustomSwitchUI;
