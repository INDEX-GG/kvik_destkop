// import axios from 'axios';
import React from 'react';
import { useMedia } from '../../hooks/useMedia';

import ProductAutoInformation from './ProductsDescription/ProductAutoInformation';
import ProductNewBuildInformation from './ProductsDescription/ProductNewBuildInformation';

import ProductDescription from './ProductDescription';
import ProductMap from './ProductMap';
// import ProductProperties from './ProductProperties';
import ProductSocial from './ProductSmallComponents/ProductSocial';
import ProductSecBuildInformation from './ProductsDescription/ProductSecBuildInformation';
import ProductRentBuildInformation from './ProductsDescription/ProductRentBuildInformation';
import ProductSellRoomInformation from './ProductsDescription/ProductSellRoomInformation';
import ProductRentRoomInformation from './ProductsDescription/ProductRentRoomInformation';

export default function ProductInformation({ address, productionInfo, description, caterory}) {
	// console.log("я правильно понимаю", productionInfo)

	const { matchesMobile, matchesTablet } = useMedia();
	
	// const testProperties = [{name: "Тип дома", desc: 'Кирпичный'}, {name: "Этаж", desc: '5 из 16'}, {name: "Количество комнта", desc: '2'}]

	let info = null
	switch (caterory){
		case "auto":
			info = <ProductAutoInformation data={productionInfo} mobile={!matchesMobile && !matchesTablet} description={description} />
			break;
		case "new_building":
			info = <ProductNewBuildInformation data={productionInfo} mobile={!matchesMobile && !matchesTablet} description={description} />
			break;
		case "secondary_housing":
			info = <ProductSecBuildInformation data={productionInfo} mobile={!matchesMobile && !matchesTablet} description={description} />
			break;
		case "rent_apartments":
			info = <ProductRentBuildInformation data={productionInfo} mobile={!matchesMobile && !matchesTablet} description={description} />
			break;
		case "sell_rooms":
			info = <ProductSellRoomInformation data={productionInfo} mobile={!matchesMobile && !matchesTablet} description={description} />
			break;
		case "rent_rooms":
			info = <ProductRentRoomInformation data={productionInfo} mobile={!matchesMobile && !matchesTablet} description={description} />
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
