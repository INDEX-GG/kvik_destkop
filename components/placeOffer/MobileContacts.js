import { Controller, useFormContext } from 'react-hook-form';
import { Box, makeStyles, Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import OutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import Filledicon from '@material-ui/icons/Brightness1';
import { useState, useEffect } from 'react';
import { phoneNumber } from '../../lib/services'
import { useStore } from '../../lib/Context/Store';
import AdditionalModalText from "#components/placeOffer/newPlaceOffer/AdditionalModalText";

const useStyles = makeStyles((theme) => ({
	formElem: {
		display: 'flex',
		flexDirection: 'row',
		marginBottom: theme.spacing(3),
		[theme.breakpoints.down(960)]: {
				marginBottom: '17px',
				width: '100%',
				'& > div': {
						width: '100%'
				}
		}
	},
	formTitleField: {
			fontSize: '14px',
			flexGrow: 1,
			padding: '4px 0',
			[theme.breakpoints.down(960)]: {
					display: 'none'
			}
	},
	formInputField: {
			width: '490px',
			display: 'flex',
			flexDirection: 'row',
			[theme.breakpoints.down(960)]: {
					flexDirection: 'column'
			}
	},
	formCheckBoxWrapper: {
		display: 'flex',
		flexDirection: 'column'
	},
	input: {
			width: '230px',
	},
	check: {
			padding: '6px',
	},
	label: {
			flexGrow: 1,
			marginLeft: theme.spacing(1),
			'& span': {
				fontWeight: '500',
				fontSize: '18px',
				lineHeight: '21px',
			}
	},
	error: {
			color: theme.palette.error.main,
			fontSize: '12px',
			paddingTop: '2px',
			marginLeft: '24px',
	},
}));

export default function MobileContact() {
	const classes = useStyles();
	const methods = useFormContext();
	const { userInfo } = useStore();
	const [phones, setPhones] = useState([]);

	useEffect(() => {
		if (userInfo !== undefined) {
			setPhones([{ value: userInfo.phone, label: phoneNumber(userInfo.phone) }]);
			methods.setValue('contact',  userInfo.phone)
		}
	}, [userInfo])


	const handlerChangePhone = (contact, onChange) => (e) => {
		e.preventDefault()
		onChange(e.target.checked)
		methods.setValue('contact', contact)
	}

	return (
		<Box className={classes.formElem}>
		<Typography className={classes.formTitleField}>Контакты</Typography>
		<AdditionalModalText title='Способ связи' alias='contacts'>
				<Box className={classes.formInputField}>
						<Box className={classes.formCheckBoxWrapper}>
								<Controller
										name='bymessages'
										control={methods.control}
										defaultValue={true}
										render={({field: {onChange, value}}) => (
												<FormControlLabel
														className={classes.label}
														control={
																<Checkbox
																		className={classes.check}
																		color='primary'
																		icon={<OutlinedIcon/>}
																		checkedIcon={<Filledicon/>}
																		checked={value}
																		onChange={(e) => onChange(e.target.checked)}
																/>}
														label="Сообщения на сайте"
												/>
										)}
										rules={{required: !(methods.watch('bymessages') || methods.watch('byphone')) ? 'Выберите способ для обратной связи' : null}}
								/>

								<Controller
										name='byphone'
										control={methods.control}
										defaultValue={true}
										render={({field: {onChange, value}}) => (
											<>
												{phones.map((item) => (
													<FormControlLabel
														key={item.value}
														className={classes.label}
														control={
																<Checkbox
																		className={classes.check}
																		color='primary'
																		icon={<OutlinedIcon/>}
																		checkedIcon={<Filledicon/>}
																		checked={userInfo?.phone === item.value ? value : false}
																		onChange={handlerChangePhone(item.value, onChange)}
																/>}
														label={item.label}
													/>
												))}
											</>
										)}
										rules={{required: 'Выберите номер для связи'}}
								/>

								<Typography className={classes.error}>{methods.formState.errors?.byphone?.message}</Typography>
						</Box>
				</Box>
			</AdditionalModalText>
		</Box>
	)
}
