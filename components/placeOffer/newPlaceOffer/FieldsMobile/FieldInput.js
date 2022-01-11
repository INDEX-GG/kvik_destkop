import React from 'react';
import {makeStyles, TextField} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    formInputField: {
        width: '100%',

        '& > div': {
            '&  > input': {
                "&::placeholder": {
                    opacity: 0
                },
            },

            '&  > textarea': {
                "&::placeholder": {
                    opacity: 0
                },
            },
        },

        [theme.breakpoints.down(960)]: {
            height: '100%',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',

            '& > .Mui-error': {
                borderWidth: 1,
                borderRadius: '0'
            },

            '& > .MuiInputBase-multiline': {
                paddingLeft: '0px'
            },

            '& > div': {
                height: '100%',
                '&  > input': {
                    padding: '0 0 0 10px',
                    height: '100%',
                    color: '#8F8F8F',
                    fontSize: '14px',
                    "&::placeholder": {
                        opacity: '1 !important'
                    },
                },

                '&  > textarea': {
                    padding: '0 0 0 10px',
                    height: '100%',
                    color: '#8F8F8F',
                    fontSize: '14px',
                    "&::placeholder": {
                        opacity: '1 !important'
                    },
                },

                '& > fieldset': {
                    borderRadius: 0,
                    border: 0
                },
            },


            '& > div.Mui-error': {
                '& > fieldset': {
                    border: '1px solid red !important'
                },
            },

            '& > p': {
                display: 'none',
                margin: '0',
            },
        }
    },
}));


const FieldInput = (props) => {

    const classes = useStyles();

    return (
        <TextField
            variant='outlined'
            type="text"
            fullWidth
            autoComplete="on"
            inputProps={{maxLength: 50}}
            {...props}
            className={classes.formInputField}>
            {props.children}
        </TextField>
    );
};

export default FieldInput;