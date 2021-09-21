import { Controller, useFormContext } from 'react-hook-form';
import { Box, makeStyles, TextField, Typography } from '@material-ui/core';
import { invalidСharacterProduct } from '../../lib/regulars'

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
}));

const Title = ({ title }) => {
	console.log("🚀 ~ file: Title.js ~ line 34 ~ Title ~ title", title)

	const classes = useStyles();
	const methods = useFormContext();

	return (
		<Box className={classes.formElem}>
			<Typography className={classes.formTitleField}>Название</Typography>
			{console.log(title)}
			<Box className={classes.formInputField}>
				<Controller
					name="title"
					control={methods.control}
					// defaultValue='Rhtdtnrf'
					render={({ field: { onChange, value }, fieldState: { error } }) => (
						<TextField
							defaultValue={title}
							variant='outlined'
							type="text"
							fullWidth
							autoComplete="on"
							value={value}
							onChange={onChange}
							inputProps={{ maxLength: 50 }}
							error={!!error} helperText={error ? error.message : ' '} />
					)}
					rules={{
						required: 'Введите название Товара',
						pattern: { value: invalidСharacterProduct(), message: 'Недопустимые символы' },
					}}
				/>
			</Box>
		</Box>
	)
}

export default Title