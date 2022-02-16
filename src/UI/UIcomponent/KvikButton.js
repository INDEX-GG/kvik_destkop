import React from 'react';
import {Button, makeStyles} from "@material-ui/core";

const KvikButton = (
    {
        children,
        onClick = () => null,
        type = 'button',
        disabled = false
    }
) => {
    const classes = useStyles();

    return (
        <Button
            disabled={disabled}
            type={type}
            onClick={onClick}
            classes={{root: classes.root, disabled: classes.disabled,}}
        >
            {children}
        </Button>
    );
};

const useStyles = makeStyles(() => ({
    root: {
        color: '#FFFFFF',
        backgroundColor: '#00A0AB',
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 500,
        padding: '8px 20px',
        '&:hover': {
            backgroundColor: '#00A0AB',
        }
    },
    disabled: {
        backgroundColor: '#A1DCE0',
        color: '#FFFFFF !important',
    }
}))

export default React.memo(KvikButton);
