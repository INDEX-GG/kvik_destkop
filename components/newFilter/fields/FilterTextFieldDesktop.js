import React from "react"
import {
	Box,
	TextField,
	MenuItem,
	makeStyles,
	Typography,
} from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"

import { searchItemInArray } from "#components/placeOffer/newPlaceOffer/AdditionalServices"

const useStyles = makeStyles(() => ({
	formBox: {
		margin: "24px 0",
	},
	formInputField: {
		display: "flex",
	},
	formTitle: {
		marginLeft: 8,
		fontWeight: 500,
		fontSize: 14,
		color: "#2C2C2C",
	},
	input: {
		margin: "8px",
		width: "100%",
		"& .MuiSelect-selectMenu": {
			paddingLeft: 8,
		},
	},
}))

/**
 *
 * @param {title} String
 * @param {data} Object
 * @param {alias} String
 * @param {type} Number
 * @returns
 */
const FilterTextFieldDesktop = ({ title, data, alias, type }) => {

	const classes = useStyles()
	const methods = useFormContext()

	const currentValue = methods.watch(alias, true)
	const item = searchItemInArray(data, currentValue, "alias")
	// const name = item?.name

  const handleChangeCategories = (type) => {
    switch (type) {
      case 1:
          methods.setValue('alias2', undefined)
          methods.setValue('alias3', undefined)
          break
      case 2:
          methods.setValue('alias3', undefined)
          break
      case 3:
          break;
    }
  }

  const handleChange = (e, onChange, type) => {
    e.preventDefault()
    onChange(e.target.value)
    handleChangeCategories(type)
  }

	return (
		<Box className={classes.formBox}>
			<Typography className={classes.formTitle}>{title}</Typography>
			<Box className={classes.formInputField}>
				<Controller
					name={alias}
					control={methods.control}
					defaultValue=""
					render={({ field: { value, onChange } }) => (
						<TextField
							select
							value={value}
							variant="outlined"
							onChange={(e) => handleChange(e, onChange, type)}
							className={classes.input}
						>
							{Array.isArray(data) &&
								data.map((item, i) => (
									<MenuItem key={i} value={item.alias}>
										{item.name}
									</MenuItem>
								))}
						</TextField>
					)}
				/>
			</Box>
		</Box>
	)
}

export default React.memo(FilterTextFieldDesktop)
