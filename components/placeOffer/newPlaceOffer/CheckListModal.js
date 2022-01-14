import React from 'react';
import {Box, makeStyles} from "@material-ui/core";
import {generateActive} from "#lib/services";


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


const CheckListModal = ({alias, dataItems, getValues, setValue}) => {

    const classes = useStyles();

    const handleChangeValue = (item, alias, currentValue) => {
        if (item !== currentValue) {
            setValue(alias, !!item);
        } else {
            setValue(alias, null);
        }
    }


    return (
        <Box className={classes.wrapper}>
            {Array.isArray(dataItems) && (
                dataItems.map((item, index) => {

                    const currentAlias = alias + (index + 1)
                    const currentValue = getValues(currentAlias)

                    const data =  {
                        value: item,
                        key: item,
                        activeButton: item === currentValue
                    }

                    const activeButton = generateActive(data.value, currentValue)


                    return (
                        <Box
                            key={data.key + index}
                            className={classes.item}
                            onClick={() => handleChangeValue(data.value,currentAlias, currentValue)}
                        >
                            <button
                                className={`${classes.button} ${activeButton ? classes.active : ''}`}
                            />
                            <Box>
                                <Box className={classes.text}>
                                    {data.value}
                                </Box>
                            </Box>
                        </Box>
                    )
                })
            )}
        </Box>
    );
};

export default CheckListModal;