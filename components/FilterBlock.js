import React from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import DefaultFilter from './filter/DefaultFilter';
import { FormProvider, useForm } from 'react-hook-form';
import defaultValues from "./filter/json/filterDefaultValues.json"
import filterData from "./filter/json/filterFields.json"
import FilterMain from "./filter/FilterMain"
import FilterAuto from "./filter/FilterAuto"
import FilterVacancies from './filter/FilterVacancies';
import FilterProduct from './filter/FilterProduct';

const useStyles = makeStyles(() => ({
    root: {
			marginTop: '29px',
			minWidth: '224px',
			borderRadius: 8,
			boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
		
    },
		button: {
			margin: '0 8px 8px 8px',
			'&:disabled': {
				color: '#fff',
    		backgroundColor: '#A1DCE0'
			}
		},
		buttonsField: {
			display: 'flex',
			flexDirection: 'column'
		},
		buttonClear:{
			marginTop: 24
		}
}));

const FilterBlock = ({categoryData}) => {
	let filter;
	const category = categoryData?.aliasName[0].alias.toLowerCase()
	const classes = useStyles();
  const methods = useForm({defaultValues: defaultValues	});

	switch (category){
		case 'new_building' || 'secondary_housing':
			filter = <FilterMain data={filterData['building']} />
			break;
		case 'rent_apartments':
			filter = <FilterMain data={filterData[category]} />
			break;
		case 'vacancies':
		case 'summary':
			filter = <FilterVacancies data={filterData[category]} />
			break;
		case 'auto':
			filter = <FilterAuto />
			break;
		case 'for_home':
		case 'for_personalized_care':
		case 'for_kitchen':
		case 'climatic_equipment':
		case 'cats':
		case 'dogs':
		case 'monitors':
		case 'manipulators__input_devices':
		case 'expendable_materials':
		case 'ram':
		case 'data_storage':
		case 'housings_corp':
		case 'video_cards_componentsss':
		case 'other_comp':
		case 'personal_computer_accessories':
		case 'ram_for_servers':
		case 'server_network_hardware':
		case 'steering_wheels_gamepads_joysticks':
		case 'printers':
			filter = <FilterProduct data={filterData[category]} />
			break;
			
		default: 
			filter = <DefaultFilter />
	}

	const onSubmit = (data) => {
		let result = {}
		for (let key in data){
			if (Array.isArray(data[key])){
				if (data[key].length > 0) {
					result[key] = data[key]
					continue
				}
			}
			else if (data[key]){
				result[key] = data[key]
			}
		}
		console.log(result);
	}

	const clearFields = () => {
		methods.reset()
	}
	
	

	return (
		<FormProvider {...methods}>
			<form className={classes.root} onSubmit={methods.handleSubmit(onSubmit)} >
				{filter}
				<Box className={classes.buttonsField}>
					<Button className={classes.button} disabled={!methods.formState.isDirty} type='submit' color='primary' variant='contained'>Показать объявления</Button>
					{methods.formState.isDirty && 
						<Button className={`${classes.button} ${classes.buttonClear}`}onClick={clearFields} color='default' variant='contained' >Очистить фильтр</Button>
					}
				</Box>
			</form>
		</FormProvider>
	)
}

export default FilterBlock
