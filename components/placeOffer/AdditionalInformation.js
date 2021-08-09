import { Controller, useFormContext } from 'react-hook-form';
import { Box, makeStyles, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formElem: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: theme.spacing(3),
    },
    formTitleField: {
        flexGrow: 1,
        padding: '4px 0',
    },
    formInputField: {
        width: '490px',
    },
}));

const AdditionalInformation = (data) => {
    console.log(data)
    const classes = useStyles();
    const methods = useFormContext();

    return (
        <Box className={classes.formElem}>
            <Typography className={classes.formTitleField}>Доп. описание</Typography>



        </Box>
    )
}

export default AdditionalInformation
