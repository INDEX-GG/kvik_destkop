import React, { useEffect, useRef, useState } from 'react';

import {phoneNumberWithPlus} from '#lib/services'

const ProductNumberPng = ({phone, x, y, smallPhone}) => {

    const phoneNumber = phoneNumberWithPlus(phone) || phone

    const canvasRef = useRef()
    const [img, setImg] = useState('')
    useEffect(async () => {
        let canvasTxt = canvasRef.current.getContext("2d");
        canvasTxt.canvas.width = smallPhone ? 200 : 260;
        canvasTxt.canvas.height = 36;
        canvasTxt.font = smallPhone ? 'bold 22px sans-serif' : 'bold 30px sans-serif'
        canvasTxt.fillText(phoneNumber, x, y);
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
