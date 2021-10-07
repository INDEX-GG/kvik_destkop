import Auto from './Options/Auto';
import TvSetCat2 from './Options/Tv_sets_cat2';
import ChargersPowerSupplies from './Options/Chargers_power_supplies';
import SmartWatches from './Options/Smart_watches_and_fitness_bracelets';
import Tablets from './Options/Tablets';
import MainPlaceholder from './Options/MainPlaceholder';
import WorkPlaceholder from './Options/WorkPlaceholder';
import Bulldozers from './Options/Bulldozers';
import Trailers from './Options/Trailers';
import Trucks from './Options/Trucks';
import TruckCranes from './Options/Truck_cranes';
import CommunalMachinery from './Options/Communal_machinery';
import LightCommercialVehicles from './Options/Light_commercial_vehicles';
import Attachments from './Options/Attachments';
import Loaders from './Options/Loaders';





const AdditionalInformation = (data) => {

	
	console.log(">>>>", data);

	switch (data.asd) {
		case 'agricultural_machinery':
			return null;

		case 'all_marks':
			return null;

		case 'attachments':
			return <Attachments data={data.newOBJ[data.asd]} />;

		case 'atvs_and_buggy':
			return null;

		case 'atvs_kvadro':
			return null;

		case 'atvs':
			return null;


		case 'auto':
			return <Auto data={data.newOBJ[data.asd]} />;


		case 'boats_and_yachts':
			return null;

		case 'bulldozers':
			return <Bulldozers data={data.newOBJ[data.asd]} />;

		case 'buses':
			return null;



		case 'chargers_power_supplies':
			return <ChargersPowerSupplies data={data.newOBJ[data.asd]} />;


		case 'communal_machinery':
			return <CommunalMachinery data={data.newOBJ[data.asd]} />;

		case 'construction_machinery':
			return null;

		case 'controllers_adapters_modules_for_servers':
			return null;

		case 'excavators':
			return null;


		case 'flash_drive':
			return null;

		case 'forestry_equipment':

			return null;

		case 'hdd':

			return null;

		case 'house_on_wheels':

			return null;

		case 'jet_skis':

			return null;
		case 'karting':

			return null;

		case 'light_commercial_vehicles':

			return <LightCommercialVehicles data={data.newOBJ[data.asd]} />;
		case 'loaders':

			return <Loaders data={data.newOBJ[data.asd]} />;
		case 'memory_card':

			return null;

		case 'mopeds_and_scooters':

			return null;
		case 'motor_boats':

			return null;
		case 'motorcycles_parts_and_accessories':

			return null;

		case 'motorcycles':

			return null;
		case 'new_building_abroad':

			return null;



		case 'other_transport':

			return null;
		case 'parts_and_accessories':

			return null;




		case 'processors_cat':

			return null;



		case 'rent_apartments_abroad':

			return null;

		case 'rent_building_abroad':

			return null;


		case 'rent_commercial_premises_abroad':

			return null;

		case 'rent_free_premises_abroad':

			return null;



		case 'rent_gerageabroad':

			return null;
		case 'rent_houses_and_cottages_abroad':

			return null;


		case 'rent_of_boats_and_yachts':

			return null;
		case 'rent_office_space_abroad':

			return null;


		case 'rent_parkingplaceabroad':

			return null;
		case 'rent_production_room_abroad':

			return null;


		case 'rent_warehouse_space_abroad':

			return null;

		case 'secondary_housing_abroad':

			return null;

		case 'sell_building_abroad':

			return null;

		case 'sell_commercial_premises_abroad':

			return null;
	
		case 'sell_free_premises_abroad':

			return null;
		
		case 'sell_office_space_abroad':
			return null;
		case 'sell_garageabroad':
			return null;
		case 'sell_houses_and_cottages_abroad':
			return null;



		case 'audio_engineering':
		case 'climatic_equipment':
		case 'car_goods':
		case 'cooking_food':
		case 'bicycles':
		case 'hi_fi_technology':
		case 'motherboards_perif':		
		case 'electronic_books':
		case 'cats':
		case 'goods_for_children_toys':
		case 'food_storage':
		case 'for_home':
		case 'for_kitchen':
		case 'for_personalized_care':
		case 'household_goods':
		case 'dogs':
		case 'plants_and_seeds':
		case 'printers':
		case 'consumables_for_office_equipment':
		case 'data_storage':
		case 'housings_corp':
		case 'expendable_materials':
		case 'monitors':
		case 'ram_for_servers':
		case 'ram':
		case 'server_network_hardware':
		case 'mfps_and_scanners':
		case 'manipulators__input_devices':
		case 'other_comp':
		case 'personal_computer_accessories':
		case 'rent_houses_and_cottages':
		case 'sell_houses_and_cottages':
		case 'desktop_computers':
		case 'laptops':
		case 'new_building':
		case 'rent_apartments':
		case 'rent_building':
		case 'rent_commercial_premises':
		case 'rent_garage':
		case 'rent_free_premises':
		case 'rent_office_space':
		case 'rent_parkingplace':
		case 'rent_production_room':
		case 'rent_rooms':
		case 'rent_warehouse_space':
		case 'sell_abroad':
		case 'rent_abroad':
		case 'secondary_housing':
		case 'sell_agriculturalland':
		case 'sell_building':
		case 'sell_commercial_premises':
		case 'sell_commercialland':
		case 'sell_free_premises':
		case 'sell_garage':
		case 'sell_izhs':
		case 'sell_office_space':
		case 'sell_parkingplace':
		case 'sell_production_room':
		case 'steering_wheels_gamepads_joysticks':
		case 'sell_rooms':
		case 'sell_snt':
		case 'sell_warehouse_space':
		case 'video_engineering':
		case 'smartphones':
		case 'tv_accessories':
		case 'table_setting':	
		case 'tires':
		case 'wheels':
		case 'video_surveillance':
		case 'ups_and_surge_protectors':
		case 'video_cards_componentsss':
		case 'telephones':
			return <MainPlaceholder data={data.newOBJ[data.asd]} />;

		case 'vacancies':
		case 'summary':
			return <WorkPlaceholder data={data.newOBJ[data.asd]} />;

		
		case 'sell_parkingplaceabroad':
			return null;
		case 'sell_production_room_abroad':
			return null;
		case 'sell_warehouse_space_abroad':
			return null;
		case 'server_enclosures':
			return null;
		case 'server_hard_drive':
			return null;
		case 'server_motherboards':
			return null;

		case 'server_processorss':
			return null;
		case 'servers':
			return null;


		case 'smart_watches_and_fitness_bracelets':
			return <SmartWatches data={data.newOBJ[data.asd]} />;
	
		case 'snowmobiles':
			return null;
		case 'tablets':
			return <Tablets data={data.newOBJ[data.asd]} />;
		case 'tractors_and_agricultural_machinery':
			return null;
		case 'tractors':
			return null;
		case 'trailers':
			return <Trailers data={data.newOBJ[data.asd]} />;
		case 'truck_cranes':
			return <TruckCranes data={data.newOBJ[data.asd]} />;
		case 'trucks':
			return <Trucks data={data.newOBJ[data.asd]} />;
		case 'tv_sets_cat2':
			return <TvSetCat2 data={data.newOBJ[data.asd]} />;
	
		default:
			// console.log('')
			return null;
	}





	// return (
	// 	<>
	// 	</>
	// 	//     <Box className={classes.formElem}>
	// 	//         {Object.entries(data.newOBJ).map((item, key) => (
	// 	//             <>
	// 	//                 {item[1].fields.marks !== undefined && (
	// 	//                     <>
	// 	//                         <Box key={key} className={classes.formInputMainField}>
	// 	//                             <Typography className={classes.formTitleField}>Марка</Typography>
	// 	//                             <Box className={classes.formInputField}>
	// 	//                                 <Controller
	// 	//                                     name={"modelsAuto"}
	// 	//                                     control={methods.control}
	// 	//                                     render={({ field: { onChange, value }, fieldState: { error } }) => (
	// 	//                                         <TextField
	// 	//                                             select
	// 	//                                             className={classes.input}
	// 	//                                             variant='outlined'
	// 	//                                             value={value}
	// 	//                                             onChange={onChange}
	// 	//                                             error={!!error}
	// 	//                                             helperText={error ? error.message : ' '}>
	// 	//                                             {item[1].fields.marks.map((item, i) => (
	// 	//                                                 <MenuItem key={i} value={item.name}>
	// 	//                                                     {item.name}
	// 	//                                                 </MenuItem>
	// 	//                                             ))}
	// 	//                                         </TextField>
	// 	//                                     )}
	// 	//                                     rules={{ required: 'Выберите ' }}
	// 	//                                 />
	// 	//                             </Box>
	// 	//                         </Box>

	// 	//                         <Box key={key} className={classes.formInputMainField}>
	// 	//                             {methods.watch('modelsAuto') &&
	// 	//                                 <>
	// 	//                                     <Typography className={classes.formTitleField}>Модель</Typography>
	// 	//                                     <Box className={classes.formInputField}>
	// 	//                                         <Controller
	// 	//                                             name="carModel"
	// 	//                                             control={methods.control}
	// 	//                                             render={({ field: { onChange, value }, fieldState: { error } }) => (
	// 	//                                                 <TextField
	// 	//                                                     select
	// 	//                                                     className={classes.input}
	// 	//                                                     variant='outlined'
	// 	//                                                     value={value}
	// 	//                                                     onChange={onChange}
	// 	//                                                     error={!!error}
	// 	//                                                     helperText={error ? error.message : ' '}
	// 	//                                                 >
	// 	//                                                     {item[1].fields.marks.filter(item => item.name === methods.watch('modelsAuto')).map((item, i) => item.models.map((item, i) =>
	// 	//                                                         <MenuItem key={i} value={item.name}>
	// 	//                                                             {item.name}
	// 	//                                                         </MenuItem>
	// 	//                                                     ))
	// 	//                                                     }
	// 	//                                                 </TextField>
	// 	//                                             )}
	// 	//                                             rules={{ required: 'Выберите ' }}
	// 	//                                         />
	// 	//                                     </Box>
	// 	//                                 </>
	// 	//                             }
	// 	//                         </Box>

	// 	//                         {/* <Box key={key} className={classes.formInputMainField}>
	// 	//                             {methods.watch('modelsAuto') &&
	// 	//                                 <>
	// 	//                                     <Typography className={classes.formTitleField}>Модель</Typography>
	// 	//                                     <Box className={classes.formInputField}>
	// 	//                                         <Controller
	// 	//                                             name="carModel"
	// 	//                                             control={methods.control}
	// 	//                                             render={({ field: { onChange, value }, fieldState: { error } }) => (
	// 	//                                                 <TextField
	// 	//                                                     select
	// 	//                                                     className={classes.input}
	// 	//                                                     variant='outlined'
	// 	//                                                     value={value}
	// 	//                                                     onChange={onChange}
	// 	//                                                     error={!!error}
	// 	//                                                     helperText={error ? error.message : ' '}
	// 	//                                                 >
	// 	//                                                     {item[1].fields.marks.filter(item => item.name === methods.watch('modelsAuto')).map((item, i) => item.models.map((item, i) =>
	// 	//                                                         <MenuItem key={i} value={item.name}>
	// 	//                                                             {item.name}
	// 	//                                                         </MenuItem>
	// 	//                                                     ))
	// 	//                                                     }
	// 	//                                                 </TextField>
	// 	//                                             )}
	// 	//                                             rules={{ required: 'Выберите ' }}
	// 	//                                         />
	// 	//                                     </Box>
	// 	//                                 </>
	// 	//                             }
	// 	//                         </Box> */}
	// 	//                     </>
	// 	//                 )}
	// 	//                 <Box key={key} className={classes.formInputMainField}>

	// 	//                     {item[1].fields.marks === undefined &&
	// 	//                         (item[1].fields === 'NULL' ?
	// 	//                             <>
	// 	//                                 <Typography className={classes.formTitleField}>{item[1].name}</Typography>
	// 	//                                 <Box className={classes.formInputField}>
	// 	//                                     <Controller
	// 	//                                         name={item[1].alias}
	// 	//                                         control={methods.control}
	// 	//                                         defaultValue=''
	// 	//                                         render={({ field: { onChange, value }, fieldState: { error } }) => (
	// 	//                                             <TextField
	// 	//                                                 variant='outlined'
	// 	//                                                 type="text"
	// 	//                                                 fullWidth
	// 	//                                                 autoComplete="on"
	// 	//                                                 value={value}
	// 	//                                                 onChange={onChange}
	// 	//                                                 error={!!error} helperText={error ? error.message : ' '} />
	// 	//                                         )}
	// 	//                                         rules={{ required: 'Укажите ваше местоположение...' }}
	// 	//                                     />
	// 	//                                 </Box>
	// 	//                             </>
	// 	//                             :
	// 	//                             <>
	// 	//                                 <Typography className={classes.formTitleField}>{item[1].name}</Typography>
	// 	//                                 <Box className={classes.formInputField}>
	// 	//                                     <Controller
	// 	//                                         name={'aliasFields' + key}
	// 	//                                         control={methods.control}
	// 	//                                         render={({ field: { onChange, value }, fieldState: { error } }) => (
	// 	//                                             <TextField
	// 	//                                                 select
	// 	//                                                 className={classes.input}
	// 	//                                                 variant='outlined'
	// 	//                                                 value={value}
	// 	//                                                 onChange={onChange}
	// 	//                                                 error={!!error}
	// 	//                                                 helperText={error ? error.message : ' '}>
	// 	//                                                 {item[1].fields.map((option, i) => (
	// 	//                                                     <MenuItem key={i} value={option}>
	// 	//                                                         {option}
	// 	//                                                     </MenuItem>
	// 	//                                                 ))}
	// 	//                                             </TextField>
	// 	//                                         )}
	// 	//                                         rules={{ required: 'Выберите ' }}
	// 	//                                     />
	// 	//                                 </Box>
	// 	//                             </>
	// 	//                         )}
	// 	//                 </Box>
	// 	//             </>))}
	// 	//     </Box>
	// )
}
export default AdditionalInformation
