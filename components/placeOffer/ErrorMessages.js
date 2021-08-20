import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { isObjectEmpty } from '../../lib/services';

const useStyles = makeStyles(() => ({
    fg: {
        flexGrow: 1,
		display: 'flex',
		flexDirection: 'column',
    },
}));

const ErrorMessages = () => {
	const classes = useStyles();
	const methods = useFormContext();

	return (
		<Box className={classes.fg}>
			{!!methods.formState.errors?.title && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.title?.message}</Typography>}
			{!!methods.formState.errors?.alias1 && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.alias1?.message}</Typography>}
			{!!methods.formState.errors?.alias2 && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.alias2?.message}</Typography>}
			{!!methods.formState.errors?.alias3 && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.alias3?.message}</Typography>}
			{!!methods.formState.errors?.alias4 && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.alias4?.message}</Typography>}
			{!!methods.formState.errors?.description && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.description?.message}</Typography>}
			{!!methods.formState.errors?.price && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.price?.message}</Typography>}
			{!!methods.formState.errors?.photoes && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.photoes?.message}</Typography>}
			{!!methods.formState.errors?.location && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.location?.message}</Typography>}
			{isObjectEmpty(methods.formState.errors) && <Typography variant='subtitle2'>Заполните все обязательные поля</Typography>}
		</Box>
	)
}

export default ErrorMessages;