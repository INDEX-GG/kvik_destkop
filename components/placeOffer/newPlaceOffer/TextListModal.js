import React from 'react';
import {Box, makeStyles} from "@material-ui/core";


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

const TextListModal = ({alias, dataItems, getValues, setValue}) => {

    const classes = useStyles();
    const currentValue = getValues(alias)

    const handleChangeValue = (item) => {
        if (item?.value !== currentValue) {
            setValue(alias, item?.value)
        }
    }

    console.log(currentValue);

    return (
        <Box className={classes.wrapper}>
            {Array.isArray(dataItems) && (
                dataItems.map((item, index) => {

                    const activeButton = item?.props?.value === currentValue

                    return (
                        <Box key={item.key + index} className={classes.item}>
                            <button
                                className={`${classes.button} ${activeButton ? classes.active : ''}`}
                                onClick={() => handleChangeValue(item.props)}
                            />
                            <Box>
                                <Box className={classes.text}>
                                    {item.props.value}
                                </Box>
                            </Box>
                        </Box>
                    )
                })
            )}
        </Box>
    );
};

export default TextListModal;