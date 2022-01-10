import React, {useEffect, useState} from 'react';
import {Box, makeStyles} from "@material-ui/core";
import ArrowRight from "#UI/icons/ArrowRight";
import MobileModal from "#components/MobileModal";
import TextListModal from "#components/placeOffer/newPlaceOffer/TextListModal";

const useStyles = makeStyles(() => ({
    box: {
        height: '48px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        marginBottom: '15px',
        display: "flex",
        alignItems: "center",
        justifyContent: 'space-between',
        padding: '0 0 0 10px'
    },
    title: {
        fontSize: '16px',
        color: '#151515'
    },
    iconWrapper: {
        padding: '10px 18px 10px 10px',
        cursor: 'pointer',
    },
    icon: {
        width: '9px',
        height: '18px',
        // padding: '10px'
    }
}));

const AdditionalFieldModal = ({title, dataItems, getValues, setValue, alias}) => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const currentValue = getValues(alias)

    const handleChangeDialog = () => {
        setOpen(prevState => !prevState)
    }

    useEffect(() => {
        if (Array.isArray(dataItems)) {
            if (dataItems.length === 1) {
                const itemValue = dataItems[0].props.value;
                if (currentValue !== itemValue) {
                    setValue(alias, itemValue)
                }
                setDisabled(true)
                return
            }
        }
        setDisabled(false)
    }, [dataItems])

    return (
        <>
            <Box className={classes.box}>
                <Box className={classes.title}>{currentValue ? currentValue : title}</Box>
                {!disabled && (
                    <Box className={classes.iconWrapper} onClick={handleChangeDialog}>
                        <Box className={classes.icon}>
                            <ArrowRight/>
                        </Box>
                    </Box>
                )}
            </Box>
            <MobileModal
                title={title}
                dialog={open}
                close={handleChangeDialog}>
                <TextListModal
                    dataItems={dataItems}
                    setValue={setValue}
                    getValues={getValues}
                    alias={alias}
                />
            </MobileModal>
        </>
    );
};

export default AdditionalFieldModal;