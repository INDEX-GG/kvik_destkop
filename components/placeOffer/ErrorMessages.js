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
			{!!methods.formState.errors?.type_park_auto && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.type_park_auto?.message}</Typography>}
			{!!methods.formState.errors?.vine && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.vine?.message}</Typography>}
			{!!methods.formState.errors?.modelsAuto && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.modelsAuto?.message}</Typography>}
			{!!methods.formState.errors?.submodels && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.submodels?.message}</Typography>}
			{!!methods.formState.errors?.generation && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.generation?.message}</Typography>}
			{!!methods.formState.errors?.modification && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.modification?.message}</Typography>}
			{!!methods.formState.errors?.color && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.color?.message}</Typography>}
			{!!methods.formState.errors?.mileage && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.mileage?.message}</Typography>}
			{!!methods.formState.errors?.owners_of_pts && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.owners_of_pts?.message}</Typography>}
			{!!methods.formState.errors?.documents && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.documents?.message}</Typography>}
			{!!methods.formState.errors?.condition && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.condition?.message}</Typography>}
			{!!methods.formState.errors?.exchange_is_possible && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.exchange_is_possible?.message}</Typography>}
			{!!methods.formState.errors?.status && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.status?.message}</Typography>}
			{!!methods.formState.errors?.steering_wheel && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.steering_wheel?.message}</Typography>}
			{!!methods.formState.errors?.description && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.description?.message}</Typography>}
			{!!methods.formState.errors?.price && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.price?.message}</Typography>}
			{!!methods.formState.errors?.photoes && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.photoes?.message}</Typography>}
			{!!methods.formState.errors?.location && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.location?.message}</Typography>}
			{isObjectEmpty(methods.formState.errors) && <Typography variant='subtitle2'>Заполните все обязательные поля</Typography>}
		</Box>
	)
}

export default ErrorMessages;
