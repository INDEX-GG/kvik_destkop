import React, {useState} from 'react';
import {Box, makeStyles} from "@material-ui/core";
import ArrowRight from "#UI/icons/ArrowRight";
import FilterItemModal from "#components/newFilter/fields/FilterItemModal";
import {useFormContext} from "react-hook-form";
import {searchItemInArray} from "#components/placeOffer/newPlaceOffer/AdditionalServices";

const useStyles = makeStyles(() => ({
    item: {
        width: '100%',
        height: '38px',
        marginBottom: '15px',
        padding: '10px 12px 9px 14px',
        border: '1px solid #C7C7C7',
        borderRadius: 5
    },
    text: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    name: {
        fontSize: '16px',
        lineHeight: '18.75px',
        fontWeight: '400',
        color: '#C7C7C7'
    },
    activeName: {
        color: '#2C2C2C'
    },
    arrow: {
        width: '14px',
        height: '14px',
        transform: 'rotate(90deg)'
    }
}));

const FilterTextField = ({title, alias, data, type}) => {


    const classes = useStyles()
    const methods = useFormContext();

    const [open, setOpen] = useState(false);

    const currentValue = methods.watch(alias, true)
    const item = searchItemInArray(data, currentValue, 'alias')
    const name = item?.name

    const handleOpenDialog = (state = true) => {
        setOpen(state)
    }

    const handleClearCategories = (type) => {
        switch (type) {
            case 1:
                methods.setValue('alias1', undefined)
                methods.setValue('alias2', undefined)
                methods.setValue('alias3', undefined)
                break
            case 2:
                methods.setValue('alias2', undefined)
                methods.setValue('alias3', undefined)
                break
            case 3:
                methods.setValue('alias3', undefined)
                methods.setValue('alias3', undefined)
        }
        setOpen(false)
    }

    const handleChangeCategories = (type) => {
        switch (type) {
            case 1:
                methods.setValue('alias2', undefined)
                methods.setValue('alias3', undefined)
                break
            case 2:
                methods.setValue('alias3', undefined)
                break
            case 3:
                break;
        }
    }


    return (
        <>
            <Box className={classes.item} onClick={handleOpenDialog}>
                <Box className={classes.text}>
                    <p className={`${classes.name} ${name ? classes.activeName : ''}`}>
                        {name ? name : title}
                    </p>
                    <Box className={classes.arrow}>
                        <ArrowRight/>
                    </Box>
                </Box>
            </Box>
            <FilterItemModal
                data={data}
                alias={alias}
                title={title}
                open={open}
                handleClearCategories={() => handleClearCategories(type)}
                handleChangeCategories={() => handleChangeCategories(type)}
                changeOpen={handleOpenDialog}
            />
        </>
    );
};

export default FilterTextField;