import { Controller, useFormContext } from 'react-hook-form';
import React, { useEffect } from 'react';
import { Box, Checkbox, FormControlLabel, makeStyles, Typography } from '@material-ui/core';
import OutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import Filledicon from '@material-ui/icons/Brightness1';
import { cursorReplace, priceFormat } from '../../../lib/priceFormat';
import {useMediaQuery} from "@mui/material";
import FieldInput from "#components/placeOffer/newPlaceOffer/FieldsMobile/FieldInput";



const useStyles = makeStyles((theme) => ({
	formElem: {
		display: 'flex',
		flexDirection: 'row',
		marginBottom: theme.spacing(3),
        [theme.breakpoints.down(960)]: {
            width: '100%',
            position: 'relative',
            marginBottom: '15px'
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
        [theme.breakpoints.down(960)]: {
            width: '100%',
        }
	},
	priceField: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-start',
        '& > div': {
            [theme.breakpoints.down(960)]: {
                width: '100%',
                height: '48px',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',

                '& > .Mui-error': {
                    borderWidth: 1,
                    borderRadius: '0'
                },

                '& > label': {
                    lineHeight: 0.5,
                    color: '#8F8F8F !important'
                },

                '& > .MuiInputBase-multiline': {
                    paddingLeft: '0px'
                },

                '& > div': {
                    height: '100%',
                    '&  > input': {
                        padding: '0 0 0 10px',
                        height: '100%',
                        color: '#151515',
                        fontSize: '16px',
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
        }
	},
	check: {
		padding: '6px',
        [theme.breakpoints.down(960)]: {
            paddingRight: '5px'
        }
	},
	label: {
		marginLeft: theme.spacing(1),
		'& span': {
			fontSize: '14px',
		},
        [theme.breakpoints.down(960)]: {
            position: 'absolute',
            right: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            margin: 0
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
    const media960 = useMediaQuery('(max-width: 960px)')
	const isTradable = methods.getValues('trade')
	const isPriced = methods.getValues('price')


	!edit ? useEffect(() => {
		methods.setValue('price', '')
	}, []) : ''
	//условие потому что c бэка приходит цена формата 5000.00, нам нужна 5000, 
	if(isPriced && isPriced.includes('.')) {
		methods.setValue('price', `${isPriced.split('.')[0]} ₽`)
	}
	return (
		<Box className={classes.formElem}>
			<Typography className={classes.formTitleField}>Цена </Typography>
			<Box className={classes.formInputField}>
				<Box className={classes.priceField}>
					<Controller
						name="price"
						control={methods.control}
						shouldUnregister
						defaultValue={`${isPriced || price} ₽`}

						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<>
							<FieldInput
								variant='outlined'
								type="text"
								autoComplete="on"
								value={value}
                                label={media960 ? 'Цена, ₽' : ''}
                                className={classes.input}
								onKeyDown={e => cursorReplace(e)}
								onChange={e => onChange(priceFormat(e))}
								error={!!error} helperText={error ? error.message : ' '} >
								{price.length && price.length < 20 ? <span className={classes.tooltip} style={{left: 20 + price.length * 8 }}> ₽</span> : null}

							</FieldInput>
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
										defaultChecked={isTradable}
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
