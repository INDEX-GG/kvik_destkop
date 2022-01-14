import React, {useEffect, useState} from 'react';
import {Box, makeStyles} from "@material-ui/core";
import ArrowRight from "#UI/icons/ArrowRight";
import MobileModal from "#components/MobileModal";
import TextListModal from "#components/placeOffer/newPlaceOffer/TextListModal";
import CheckListModal from "#components/placeOffer/newPlaceOffer/CheckListModal";
import {ellipsis} from "#lib/services";
import ColorListModal from "#components/placeOffer/newPlaceOffer/ColorListModal";

const useStyles = makeStyles(() => ({
    box: {
        height: '48px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        display: "flex",
        alignItems: "center",
        justifyContent: 'space-between',
        padding: '0 0 0 10px',
        position: 'relative'
    },
    title: {
        fontSize: '16px',
        height: '19px',
        overflow: 'hidden',
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
    },
    label: {
        position: 'absolute',
        left: '13px',
        top: '-2px',
        fontSize: '10px',
        color: '#8F8F8F'
    }
}));



const generateMadalContent = (data) => {

    const {type, alias, text_list_rendering_type, dataItems, setValue, getValues} = data

    switch (type) {
        case 'text_list':

            if (text_list_rendering_type === 1) {
                return (
                    <ColorListModal
                        dataItems={dataItems}
                        setValue={setValue}
                        getValues={getValues}
                        alias={alias}
                    />
                )
            }

            return (
                <TextListModal
                    type={type}
                    dataItems={dataItems}
                    setValue={setValue}
                    getValues={getValues}
                    alias={alias}
                />
            )
        case 'period':
            return (
                <TextListModal
                    type={type}
                    dataItems={dataItems}
                    setValue={setValue}
                    getValues={getValues}
                    alias={alias}
                />
            )
        case 'check_list':
            return (
                <CheckListModal
                    dataItems={dataItems}
                    setValue={setValue}
                    getValues={getValues}
                    alias={alias}
                />
            )
        case 'text_list_time':
            return (
                <TextListModal
                    type={type}
                    dataItems={dataItems}
                    setValue={setValue}
                    getValues={getValues}
                    alias={alias}
                />
            )
    }
}


const AdditionalFieldModal = ({jsonData, dataItems, getValues, setValue}) => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const {title, type, alias} = jsonData


    const generateCurrentValue = (type, alias, dataItem) => {

        if (type === 'check_list') {

            let finalString = '';

            if (Array.isArray(dataItem)) {
                for (let i = 1; i <= dataItem.length; i++) {
                    const value = getValues(alias + i)
                    if (value) {
                        finalString += `${value}, `
                    }
                }
            }

            return finalString.substr(0, finalString.length - 2)
        }

        return getValues(alias)
    }


    const currentValue = generateCurrentValue(type, alias, dataItems);

    const handleChangeDialog = () => {
        setOpen(prevState => !prevState)
    }

    useEffect(() => {
        if (Array.isArray(dataItems)) {
            if (dataItems.length === 1) {
                const itemValue = dataItems[0]?.props?.value;
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
        jsonData && (
            <>
                <Box className={classes.box} onClick={disabled ? null : handleChangeDialog}>
                    {currentValue && <Box className={classes.label}>{title}</Box>}
                    <Box className={classes.title}>{currentValue ? ellipsis(currentValue, 80) : title}</Box>
                    {!disabled && (
                        <Box className={classes.iconWrapper}>
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
                    {generateMadalContent({...jsonData, dataItems, setValue, getValues})}
                </MobileModal>
            </>
            )
    );
};

export default AdditionalFieldModal;