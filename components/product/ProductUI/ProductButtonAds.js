import React from 'react'

const ProductButtonAds = ({title, left, width, ...props}) => {

	const fullWidth = width ? 'ad_btn_full_width' : ''
	const className = left ? `ad_btn_edit buttonGrey button btn-left ${fullWidth}` : `ad_btn_edit buttonGrey button ${fullWidth}`;

	return <a style={{display: "block"}} className={className} {...props}>{title}</a>
}

export default ProductButtonAds;