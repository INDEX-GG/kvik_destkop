import Auto from './Options/Auto';
import { Dogs } from './Options/Dogs';
import { Cats } from './Options/Cats';
import Bicycles from './Options/Bicycles';
import GoodsForChildrenToys from './Options/Goods_for_children_toys';
import ForHome from './Options/For_home';
import ForKitchen from './Options/For_kitchen';
import ForPersonalCare from './Options/For_personalized_care';
import ClimaticEquipment from './Options/Climatic_equipment';
import TableSetting from './Options/Table_setting';
import CookingFood from './Options/Cooking_food';
import VideoSurveillance from './Options/Video_surveillance';
import PlantsAndSeeds from './Options/Plants_and_seeds';
import Vacancies from './Options/Vacancies';
import Summary from './Options/Summary';
import HiFiTechnology from './Options/Hi_fi_technology';
import TvAccessories from './Options/Tv_accessories';
import TvSetCat2 from './Options/Tv_sets_cat2';
import AudioEngineering from './Options/Audio_engineering';
import VideoEngineering from './Options/Video_engineering';
import Printers from './Options/Printers';
import OneListPlaseholder from './Options/Mfps_and_scanners';

const AdditionalInformation = (data) => {
	console.log('=======>', data.newOBJ)




	switch (data.asd) {
		case 'agricultural_machinery':
			return null;

		case 'all_marks':
			return null;

		case 'attachments':
			return null;

		case 'atvs_and_buggy':
			return null;

		case 'atvs_kvadro':
			return null;

		case 'atvs':
			return null;

		case 'audio_engineering':
			return <AudioEngineering	 data={data.newOBJ[data.asd]} />;

		case 'auto':
			return <Auto data={data.newOBJ[data.asd]} />;

		case 'bicycles':
			return <Bicycles data={data.newOBJ[data.asd]} />;

		case 'boats_and_yachts':
			return null;

		case 'bulldozers':
			return null;

		case 'buses':
			return null;

		case 'car_goods':
			return null;

		case 'cats':
			return <Cats data={data.newOBJ[data.asd]} />;

		case 'chargers_power_supplies':
			return null;

		case 'climatic_equipment':
			return <ClimaticEquipment data={data.newOBJ[data.asd]} />;

		case 'communal_machinery':
			return null;

		case 'construction_machinery':
			return null;

		case 'consumables_for_office_equipment':
			return <OneListPlaseholder data={data.newOBJ[data.asd]} />;

		case 'controllers_adapters_modules_for_servers':
			return null;

		case 'cooking_food':
			return <CookingFood data={data.newOBJ[data.asd]} />;

		case 'data_storage':
			return null;

		case 'desktop_computers':
			return null;

		case 'dogs':
			return <Dogs data={data.newOBJ[data.asd]} />;

		case 'electronic_books':
			return null;

		case 'excavators':
			return null;

		case 'expendable_materials':
			return null;

		case 'flash_drive':
			return null;

		case 'food_storage':

			return <CookingFood data={data.newOBJ[data.asd]} />;
		case 'for_home':

			return <ForHome data={data.newOBJ[data.asd]} />;
		case 'for_kitchen':

			return <ForKitchen data={data.newOBJ[data.asd]} />;
		case 'for_personalized_care':

			return <ForPersonalCare data={data.newOBJ[data.asd]} />;
		case 'forestry_equipment':

			return null;
		case 'goods_for_children_toys':

			return <GoodsForChildrenToys data={data.newOBJ[data.asd]} />;
		case 'hdd':

			return null;
		case 'hi_fi_technology':

		return <HiFiTechnology data={data.newOBJ[data.asd]} />;
			case 'house_on_wheels':

			return null;
		case 'household_goods':

			return <CookingFood data={data.newOBJ[data.asd]} />;
		case 'housings_corp':

			return null;
		case 'jet_skis':

			return null;
		case 'karting':

			return null;
		case 'laptops':

			return null;
		case 'light_commercial_vehicles':

			return null;
		case 'loaders':

			return null;
		case 'manipulators__input_devices':

			return null;
		case 'memory_card':

			return null;
		case 'mfps_and_scanners':

			return <OneListPlaseholder data={data.newOBJ[data.asd]} />;
		case 'monitors':

			return <OneListPlaseholder data={data.newOBJ[data.asd]} />;
		case 'mopeds_and_scooters':

			return null;
		case 'motherboards_perif':

			return null;
		case 'motor_boats':

			return null;
		case 'motorcycles_parts_and_accessories':

			return null;

		case 'motorcycles':

			return null;
		case 'new_building_abroad':

			return null;
		case 'new_building':

			return null;
		case 'other_comp':

			return null;

		case 'other_transport':

			return null;
		case 'parts_and_accessories':

			return null;
		case 'personal_computer_accessories':

			return <OneListPlaseholder data={data.newOBJ[data.asd]} />;
		case 'plants_and_seeds':

			return <PlantsAndSeeds data={data.newOBJ[data.asd]} />;

		case 'printers':

			return <Printers data={data.newOBJ[data.asd]} />;
		case 'processors_cat':

			return null;
		case 'ram_for_servers':

			return <OneListPlaseholder data={data.newOBJ[data.asd]} />;
		case 'ram':

			return null;

		case 'rent_apartments_abroad':

			return null;
		case 'rent_apartments':

			return null;
		case 'rent_building_abroad':

			return null;
		case 'rent_building':

			return null;

		case 'rent_commercial_premises_abroad':

			return null;
		case 'rent_commercial_premises':

			return null;
		case 'rent_free_premises_abroad':

			return null;
		case 'rent_free_premises':

			return null;

		case 'rent_gerage':

			return null;
		case 'rent_gerageabroad':

			return null;
		case 'rent_houses_and_cottages_abroad':

			return null;
		case 'rent_houses_and_cottages':

			return null;

		case 'rent_of_boats_and_yachts':

			return null;
		case 'rent_office_space_abroad':

			return null;
		case 'rent_office_space':

			return null;
		case 'rent_parkingplace':

			return null;

		case 'rent_parkingplaceabroad':

			return null;
		case 'rent_production_room_abroad':

			return null;
		case 'rent_production_room':

			return null;
		case 'rent_rooms':

			return null;

		case 'rent_warehouse_space_abroad':

			return null;
		case 'rent_warehouse_space':

			return null;
		case 'secondary_housing_abroad':

			return null;
		case 'secondary_housing':

			return null;

		case 'sell_agriculturalland':

			return null;
		case 'sell_building_abroad':

			return null;
		case 'sell_building':

			return null;

		case 'sell_commercial_premises_abroad':

			return null;
		case 'sell_commercial_premises':

			return null;
		case 'sell_commercialland':

			return null;

		case 'sell_free_premises_abroad':

			return null;
		case 'sell_free_premises':

			return null;
		case 'sell_garage':
			return null;
		case 'sell_garageabroad':
			return null;
		case 'sell_houses_and_cottages_abroad':
			return null;
		case 'sell_houses_and_cottages':
			return null;
		case 'sell_izhs':
			return null;
		case 'sell_office_space_abroad':
			return null;
		case 'sell_office_space':
			return null;
		case 'sell_parkingplace':
			return null;
		case 'sell_parkingplaceabroad':
			return null;
		case 'sell_production_room_abroad':
			return null;
		case 'sell_production_room':
			return null;
		case 'sell_rooms':
			return null;
		case 'sell_snt':
			return null;
		case 'sell_warehouse_space_abroad':
			return null;
		case 'sell_warehouse_space':
			return null;
		case 'server_enclosures':
			return null;
		case 'server_hard_drive':
			return null;
		case 'server_motherboards':
			return null;
		case 'server_network_hardware':
			return <OneListPlaseholder data={data.newOBJ[data.asd]} />;
		case 'server_processorss':
			return null;
		case 'servers':
			return null;
		case 'smart_watches_and_fitness_bracelets':
			return null;
		case 'smartphones':
			return null;
		case 'snowmobiles':
			return null;
		case 'steering_wheels_gamepads_joysticks':
			return <OneListPlaseholder data={data.newOBJ[data.asd]} />;
		case 'summary':
		return <Summary data={data.newOBJ[data.asd]} />;
			case 'table_setting':
		return <TableSetting data={data.newOBJ[data.asd]} />;
		case 'tablets':
			return null;
		case 'telephones':
			return null;
		case 'tires':
			return null;
		case 'tractors_and_agricultural_machinery':
			return null;
		case 'tractors':
			return null;
		case 'trailers':
			return null;
		case 'truck_cranes':
			return null;
		case 'trucks':
			return null;
		case 'tv_accessories':
			return <TvAccessories data={data.newOBJ[data.asd]} />;
		case 'tv_sets_cat2':
			return <TvSetCat2 data={data.newOBJ[data.asd]} />;
		case 'ups_and_surge_protectors':
			return <OneListPlaseholder data={data.newOBJ[data.asd]} />;
			case 'vacancies':
			return <Vacancies data={data.newOBJ[data.asd]} />;
		case 'video_cards_componentsss':
			return null;
		case 'video_engineering':
			return <VideoEngineering data={data.newOBJ[data.asd]} />;
		case 'video_surveillance':
			return <VideoSurveillance data={data.newOBJ[data.asd]} />;
		case 'wheels':
			return null;
		default:
			console.log('')
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
	// 	//                                     rules={{ required: 'Выбирите ' }}
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
	// 	//                                             rules={{ required: 'Выбирите ' }}
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
	// 	//                                             rules={{ required: 'Выбирите ' }}
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
	// 	//                                         rules={{ required: 'Выбирите ' }}
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
