import React from 'react';
import {Box, Checkbox, makeStyles} from "@material-ui/core";
import {Controller, useFormContext} from "react-hook-form";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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
    // button: {
    //     borderRadius: '50%',
    //     width: '27px',
    //     height: '27px',
    //     cursor: 'pointer',
    //     border: '1px solid black',
    //     backgroundColor: '#fff',
    //     transition: '.2s all linear'
    // },
    // active: {
    //     backgroundColor: '#00A0AB',
    // }
}));


const CheckListModal = ({alias, dataItems}) => {

    const classes = useStyles();
    const {control} = useFormContext();

    return (
        <Box className={classes.wrapper}>
            {Array.isArray(dataItems) && (
                dataItems.map((checkItem, index) => (
                    <Controller
                        key={alias + index}
                        name={alias + (index + 1)}
                        control={control}
                        defaultValue={false}
                        render={({ field: { onChange, value } }) => (
                            <FormControlLabel
                                value={value?.state}
                                className={classes.item}
                                control={
                                    <Checkbox
                                        onChange={(e) => onChange({state: !!e.target.checked, value: checkItem})}
                                        color="primary"
                                        checked={value?.state}
                                        icon={<OutlinedIcon />}
                                        checkedIcon={<Filledicon />}
                                        value={checkItem}
                                    />
                                }
                                label={checkItem}
                            />
                        )}
                    />
                ))
            )}
        </Box>
    );
};

export default CheckListModal;