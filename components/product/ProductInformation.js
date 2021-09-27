import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMedia } from '../../hooks/useMedia';
import { BASE_URL } from "../../lib/constants";

import ProductAutoInformation from './ProductsDescription/ProductAutoInformation';
import ProductDescription from './ProductDescription';
import ProductMap from './ProductMap';
// import ProductProperties from './ProductProperties';
import ProductSocial from './ProductSmallComponents/ProductSocial';
import ProductBuildInformation from './ProductsDescription/ProductBuildnformation';
import ProductSuburbanBuildnformation from './ProductsDescription/ProductSuburbanBuildnformation';
import ProductCommercialBuildnformation from './ProductsDescription/ProductCommercialBuildnformation';
import ProductAreaBuildnformation from './ProductsDescription/ProductAreaBuildnformation';
import ProductGarageInformation from './ProductsDescription/ProductGarageInformation';
import ProductWorkInformation from './ProductsDescription/ProductWorkInformation';
import ProductTechInformation from './ProductsDescription/ProductTechInformation';
import ProductForHomeInformation from './ProductsDescription/ProductForHomeInformation';

export default function ProductInformation({ productionInfo, description, caterory, address}) {
	const { matchesMobile, matchesTablet } = useMedia();
	// const [dataMap, setDataMap] = useState({})
	const [productData, setProductData] = useState(null)
	const [fieldsCount, setFieldsCount] = useState(0)
	const categoryName = caterory?.toLowerCase()

	useEffect(() => {
		let count = 0
		for (let key in productionInfo){
			if (key !== "id" && key !== "post_id" && key !== "subcategory"){
				if (productionInfo[key]) count++
			}
		}
		setFieldsCount(count)
	}, [productionInfo])



	useEffect(()=>{
		axios.get(`${BASE_URL}/subcategories/` + categoryName + `.json`)
		.then(res => {
			setProductData(res.data[categoryName])
		})
		.catch(() => {
			setProductData()
		})
	}, [caterory])

	// const testProperties = [{name: "Тип дома", desc: 'Кирпичный'}, {name: "Этаж", desc: '5 из 16'}, {name: "Количество комнта", desc: '2'}]

	let info = null
	switch (caterory){
		case "auto":
			info = <ProductAutoInformation data={productionInfo} mobile={!matchesMobile && !matchesTablet} description={description} />
			break;
		case "new_building":
		case "secondary_housing":
		case "rent_apartments":
		case "sell_rooms":
		case "rent_rooms":
			info = <ProductBuildInformation data={productionInfo} mobile={!matchesMobile && !matchesTablet} description={description} productData={productData} />
			break;
		case "sell_houses_and_cottages":
		case "rent_houses_and_cottages":
			info = <ProductSuburbanBuildnformation data={productionInfo} mobile={!matchesMobile && !matchesTablet} description={description} productData={productData} />
			break;
		case "rent_free_premises":
		case "sell_free_premises":
		case "sell_office_space":
		case "rent_office_space":
		case "sell_commercial_premises":
		case "rent_commercial_premises":
		case "sell_warehouse_space":
		case "rent_warehouse_space":
		case "sell_production_room":
		case "rent_production_room":
		case "sell_building":
		case "rent_building":
			info = <ProductCommercialBuildnformation data={productionInfo} mobile={!matchesMobile && !matchesTablet} description={description} productData={productData} />
			break;
		case "sell_izhs":
		case "sell_snt":
		case "sell_agricultural_land":
		case "sell_commercial_land":
			info = <ProductAreaBuildnformation data={productionInfo} mobile={!matchesMobile && !matchesTablet} description={description} productData={productData} />
			break;
		
		case "rent_parkingplace":
		case "sell_parkingplace":
		case "rent_garage":
		case "sell_garage":
		case "rent_abroad":
		case "sell_abroad":
			info = <ProductGarageInformation data={productionInfo} mobile={!matchesMobile && !matchesTablet} description={description} productData={productData} />
			break;
		case "summary":
		case "vacancies":
			info = <ProductWorkInformation data={productionInfo} mobile={!matchesMobile && !matchesTablet} description={description} productData={productData} />
			break;
		case "laptops":
		case "smartphones":
		case "telephones":
		case "tablets":
		case "electronic_books":
		case "chargers_power_supplies":
		case "desktop_computers":
		case "monitors":
		case "server_network_hardware":
		case "manipulators__input_devices":
		case "expendable_materials":
		case "motherboards_perif":
		case "ram":
		case "personal_computer_accessories":
		case "ram_for_servers":
		case "data_storage":
		case "housings_corp":
		case "video_cards_componentsss":
		case "other_comp":
		case "steering_wheels_gamepads_joysticks":
		case "printers":
		case "mfps_and_scanners":
		case "consumables_for_office_equipment":
		case "ups_and_surge_protectors":
		case "tv_sets_cat2":
		case "hi_fi_technology":
		case "tv_accessories":
		case "audio_engineering":
		case "video_engineering":
		case "smart_watches_and_fitness_bracelets":
			info = <ProductTechInformation data={productionInfo} mobile={!matchesMobile && !matchesTablet} description={description} productData={productData} />
			break;
		case "for_home":
		case "for_personalized_care":
		case "for_kitchen":
		case "climatic_equipment":
		case "table_setting":
		case "cooking_food":
		case "food_storage":
		case "household_goods":
		case "video_surveillance":
		case "plants_and_seeds":
		case "cats":
		case "dogs":
		case "goods_for_children_toys":
		case "bicycles":
			info = <ProductForHomeInformation data={productionInfo} mobile={!matchesMobile && !matchesTablet} description={description} productData={productData} count={fieldsCount} />
			break;
		
		default:
			info = <ProductDescription description={description} mobile={!matchesMobile && !matchesTablet}/>
	}

	return (
		<>
			<ProductMap address={address} mobile={!matchesMobile && !matchesTablet}/>
			<div className="productPageCharacter thin">
				{info}
				<ProductSocial/>
			</div>
		</>
	)
}
