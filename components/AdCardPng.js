import React, {useState, useEffect, useRef} from 'react'

import {LogoPlug} from '../UI/icons/Logo.js'
import { makeStyles } from "@material-ui/core";


const useClass = makeStyles(() => ({
  logo: {
    width: '100%',
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '& svg': {
    }
  },
  canvas: {
    width: '100%',
  },
  img: {
    width: '100%',
  }
}))

const AdCardPng = ({title = 'Товар Kvik'}) => {
	const classes = useClass()

  const [img, setImg] = useState('')
	const canvasRef = useRef()

  useEffect(() => {

    let canvasTxt = canvasRef.current.getContext('2d')
    // canvasTxt.canvas.width = 150;
		canvasTxt.canvas.height = 40;
		canvasTxt.font = '22px sans-serif'
    canvasTxt.textAlign = 'center'
    canvasTxt.textBaseline = 'middle'
		canvasTxt.fillText(title, 150, 25);

		setImg(canvasTxt.canvas.toDataURL())
  }, [])

  return (
    <div
      className={classes.logo}
    >
      <LogoPlug />
      <canvas
        ref={canvasRef}
        className={classes.canvas}
      >
        <img
          src={img}
          alt={title}
          className={classes.img}
        />
      </canvas>
    </div>
  )
}

export default React.memo(AdCardPng)
