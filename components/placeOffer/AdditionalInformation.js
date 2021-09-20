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
import OneListPlaseholder from './Options/OneListPlaseholder';
import ManipulatorsInputDevices from './Options/Manipulators__input_devices';
import MotherboardsPerifs from './Options/Motherboards_perif';
import ChargersPowerSupplies from './Options/Chargers_power_supplies';
import SmartWatches from './Options/Smart_watches_and_fitness_bracelets';
import Tablets from './Options/Tablets';
import ElectronicBooks from './Options/Electronic_books';
import SellhouseAndCottages from './Options/Sell_houses_and_cottages';
import RentHouseAndCottages from './Options/Rent_houses_and_cottages';
import MainPlaceholder from './Options/MainPlaceholder';

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
			return <ChargersPowerSupplies data={data.newOBJ[data.asd]} />;

		case 'climatic_equipment':
			return <ClimaticEquipment data={data.newOBJ[data.asd]} />;

		case 'communal_machinery':
			return null;

		case 'construction_machinery':
			return null;


		case 'manipulators__input_devices':
			return <ManipulatorsInputDevices data={data.newOBJ[data.asd]} />;

		case 'controllers_adapters_modules_for_servers':
			return null;

		case 'cooking_food':
			return <CookingFood data={data.newOBJ[data.asd]} />;



		case 'dogs':
			return <Dogs data={data.newOBJ[data.asd]} />;

		case 'electronic_books':
			return <ElectronicBooks data={data.newOBJ[data.asd]} />;

		case 'excavators':
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

		case 'jet_skis':

			return null;
		case 'karting':

			return null;

		case 'light_commercial_vehicles':

			return null;
		case 'loaders':

			return null;
		case 'memory_card':

			return null;

		case 'mopeds_and_scooters':

			return null;
		case 'motherboards_perif':
			return <MotherboardsPerifs data={data.newOBJ[data.asd]} />;
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

		case 'plants_and_seeds':

			return <PlantsAndSeeds data={data.newOBJ[data.asd]} />;

		case 'printers':

			return <Printers data={data.newOBJ[data.asd]} />;
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
		case 'rent_houses_and_cottages':

			return <RentHouseAndCottages data={data.newOBJ[data.asd]} />;

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
		case 'sell_houses_and_cottages':
			return <SellhouseAndCottages data={data.newOBJ[data.asd]} />;




		case 'consumables_for_office_equipment':
		case 'data_storage':
		case 'housings_corp':
		case 'mfps_and_scanners':
		case 'expendable_materials':
		case 'monitors':
		case 'ram_for_servers':
		case 'ram':
		case 'server_network_hardware':
			return <OneListPlaseholder data={data.newOBJ[data.asd]} />;


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
		case 'sell_rooms':
		case 'sell_snt':
		case 'sell_warehouse_space':
		case 'smartphones':
		case 'telephones':
			return <MainPlaceholder data={data.newOBJ[data.asd]} />;

		
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
		case 'steering_wheels_gamepads_joysticks':
			return <OneListPlaseholder data={data.newOBJ[data.asd]} />;
		case 'summary':
		return <Summary data={data.newOBJ[data.asd]} />;
			case 'table_setting':
		return <TableSetting data={data.newOBJ[data.asd]} />;
		case 'tablets':
			return <Tablets data={data.newOBJ[data.asd]} />;
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
		case 'video_cards_componentsss':
			return <OneListPlaseholder data={data.newOBJ[data.asd]} />;
		case 'vacancies':
			return <Vacancies data={data.newOBJ[data.asd]} />;
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
	// 	//                                     rules={{ required: 'Выберете ' }}
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
	// 	//                                             rules={{ required: 'Выберете ' }}
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
	// 	//                                             rules={{ required: 'Выберете ' }}
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
	// 	//                                         rules={{ required: 'Выберете ' }}
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
