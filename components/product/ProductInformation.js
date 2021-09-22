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

export default function ProductInformation({ postId, productionInfo, description, caterory}) {
	console.log("я правильно понимаю", productionInfo)

	const { matchesMobile, matchesTablet } = useMedia();
	const [dataMap, setDataMap] = useState({})
	const [productData, setProductData] = useState(null)
	const categoryName = caterory?.toLowerCase()
	
	// useEffect(() => {
	// 	axios.get(`${CACHE_URL}/cache/${postId}`).then(r => setDataMap(r.data))
	// }, [postId])

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
