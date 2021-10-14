import { Controller, useFormContext } from 'react-hook-form';
import React, { useEffect } from 'react';
import { Box, Checkbox, FormControlLabel, makeStyles, TextField, Typography } from '@material-ui/core';
import OutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import Filledicon from '@material-ui/icons/Brightness1';
import { cursorReplace, priceFormat } from '../../../lib/priceFormat';



const useStyles = makeStyles((theme) => ({
	formElem: {
		display: 'flex',
		flexDirection: 'row',
		marginBottom: theme.spacing(3),
	},
	formTitleField: {
		fontSize: '14px',
		flexGrow: 1,
		padding: '4px 0',
	},
	formInputField: {
		width: '490px',
	},
	priceField: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-start',
	},
	check: {
		padding: '6px',
	},
	label: {
		marginLeft: theme.spacing(1),
		'& span': {
			fontSize: '14px',
		}
	},
	tooltip: {
		position: "absolute",
		top: 9,
	}
}));

const Price = ({price, edit}) => {
	const classes = useStyles();
	const methods = useFormContext();


	!edit ? useEffect(() => {
		methods.setValue('price', '')
	}, []) : ''

	return (
		<Box className={classes.formElem}>
			<Typography className={classes.formTitleField}>Цена </Typography>
			<Box className={classes.formInputField}>
				<Box className={classes.priceField}>
					<Controller
						name="price"
						control={methods.control}
						shouldUnregister
						defaultValue={`${price} ₽`}

						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<>
							<TextField
								variant='outlined'
								type="text"
								autoComplete="on"
								value={value}
								onKeyDown={e => cursorReplace(e)}
								onChange={e => onChange(priceFormat(e))}
								error={!!error} helperText={error ? error.message : ' '} >
								{price.length && price.length < 20 ? <span className={classes.tooltip} style={{left: 20 + price.length * 8 }}> ₽</span> : null}

							</TextField>
							</>
							)}
						rules={{ required: `Введите цену ${methods.watch('title')}`, maxLength: {value: 12, message: 'Слишком длинное значение'} }}
					/>
					<Controller
						name='trade'
						control={methods.control}
						shouldUnregister
						defaultValue={false}
						render={({ field: { onChange, value } }) => (
							<FormControlLabel
								className={classes.label}
								control={
									<Checkbox
										className={classes.check}
										color='primary'
										icon={<OutlinedIcon />}
										checkedIcon={<Filledicon />}
										checked={value}
										onChange={(e) => onChange(e.target.checked)}
									/>}
								label="Торг"
							/>
						)}
					/>
				</Box>
				{/* <SafeDeal />
            <Delivery /> */}
			</Box>
		</Box>
	)
}

export default Price
