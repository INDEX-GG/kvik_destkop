import React, { useEffect, useRef, useState } from 'react';


const ProductNumberPng = ({name, x, y}) => {

	const canvasRef = useRef()
	const [img, setImg] = useState('')
	useEffect(async () => {
		let canvasTxt = canvasRef.current.getContext("2d");
		canvasTxt.canvas.width = 215;
		canvasTxt.canvas.height = 36;
		canvasTxt.font = 'bold 30px sans-serif'
		canvasTxt.fillText(name, x, y);
		setImg(canvasTxt.canvas.toDataURL())
	}, [])

	return (
		<div>
			<canvas ref={canvasRef}>
				<img id="imageNumber" src={img} />
			</canvas>
		</div>
	)
}



export default ProductNumberPng;