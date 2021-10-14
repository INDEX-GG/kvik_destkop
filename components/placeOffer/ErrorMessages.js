import { Box, makeStyles, Typography } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import { useFormContext } from 'react-hook-form';
import { isObjectEmpty } from '../../lib/services';

const useStyles = makeStyles(() => ({
    fg: {
        flexGrow: 1,
		display: 'flex',
		flexDirection: 'column',
    },
}));

const ErrorMessages = ({validate, type, edit}) => {
	const classes = useStyles();
	const methods = useFormContext();

	const [alias, setAlias] = useState(false);
	const [verifyTilte, setVerifyTilte] = useState(false);
	const [verifyDescription, setVerifyDescription] = useState(false);
	const [verifyCategory, setVerifyCategory] = useState(false);
	const [verifyPrice, setVerifyPrice] = useState(false);
	const [verifyAllFields, setVerifyAllFields] = useState(false);
	const [verifyPhotoes, setVerifyPhotoes] = useState(edit ? true :false);


	useEffect(() => {
		setVerifyTilte(!!methods.watch('title'));
		setVerifyPrice(!!methods.watch('price'));
		setVerifyCategory(alias);
		setVerifyPhotoes(!!methods.watch('photoes'));


		if (alias === 'auto'){
			if (!!methods.watch('description') === true){
				if(!!methods.watch('color') === true){
					setVerifyDescription(validateAuto())
				}
			}
		} else {
			setVerifyDescription(!!methods.watch('description'))
		}

		if (verifyTilte && verifyDescription && verifyPrice && verifyCategory && verifyPhotoes) {

			setVerifyAllFields(true)
		} else {
			setVerifyAllFields(false)
		}

	});



	useEffect(() => {
		if (methods?.watch('alias4') && (methods.control._fields === undefined ? methods.control.fieldsRef.current.alias4?._f.value !== '' : methods.control._fields.alias4?._f.value !== '')) {
			setAlias(methods?.watch('alias4'));
		} else if (methods?.watch('alias3') && (methods.control._fields === undefined ? methods.control.fieldsRef.current.alias4?._f.name === undefined : methods.control._fields.alias4?._f.name === undefined)) {
			setAlias(methods?.watch('alias3'));
		} else if (methods?.watch('alias2') && (methods.control._fields === undefined ? methods.control.fieldsRef.current.alias3?._f.name === undefined : methods.control._fields.alias3?._f.name === undefined)) {
			setAlias(methods?.watch('alias2'));
		} else {
			setAlias(false);
		}
	}, [methods?.watch('alias4'), methods?.watch('alias3'), methods?.watch('alias2')]);

	const reqAutoFields = ["type_park_auto", "vine","modelsAuto","submodels","generation","modification", "mileage","owners_of_pts","documents","condition","exchange_is_possible","status","steering_wheel", "color"];
	const validateAuto = () => {
		for (let field of reqAutoFields){
			if(!methods.watch(field)) return false
		}
		return true
	}


	let validArr = []
	if (type !== 'auto'){
		validate?.forEach((el) => {
			if (el.type?.match(/Rec/)){
				validArr.push(el.alias)
			}
		})
	}



	const auto = <>{!!methods.formState.errors?.type_park_auto && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.type_park_auto?.message}</Typography>}
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
	{!!methods.formState.errors?.steering_wheel && <Typography variant='subtitle2' color='error'>{methods.formState.errors?.steering_wheel?.message}</Typography>} </>


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
			{type === "auto" ? auto : null}
			{isObjectEmpty(methods.formState.errors) && !verifyAllFields && <Typography variant='subtitle2'>Заполните все обязательные поля</Typography>}

			{validArr.map((el, i) => {
				if (methods.formState.errors?.[el]) return <Typography key={i} variant='subtitle2' color='error'>{methods.formState.errors?.[el]?.message}</Typography>
			})}
		</Box>
	)
}

export default ErrorMessages;
