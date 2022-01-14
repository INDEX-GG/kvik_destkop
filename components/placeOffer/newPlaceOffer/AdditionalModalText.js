import React, {useState} from 'react';
import {Box, makeStyles} from "@material-ui/core";
import ArrowRight from "#UI/icons/ArrowRight";
import MobileModal from "#components/MobileModal";
import {useFormContext} from "react-hook-form";

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


const AdditionalModalText = ({title, alias, children}) => {

    const classes = useStyles();
    const {getValues} = useFormContext()
    const currentValue = getValues(alias)
    const [open, setOpen] = useState(false);

    return (
        <>
            <Box className={classes.box} onClick={() => setOpen(true)}>
                <Box className={classes.title}>{currentValue ? currentValue?.value : title}</Box>
                <Box className={classes.iconWrapper}>
                    <Box className={classes.icon}>
                        <ArrowRight/>
                    </Box>
                </Box>
            </Box>
            <MobileModal
                title={title}
                dialog={open}
                close={() => setOpen(false)}
            >
                {children}
            </MobileModal>
        </>
    );
};

export default AdditionalModalText;