import React, {useState, useEffect, useRef} from 'react'

import {LogoPlug} from '../UI/icons/Logo.js'
import { makeStyles } from "@material-ui/core";


const useClass = makeStyles((theme) => ({
  logo: {
    width: '100%',
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '& svg': {
      [theme.breakpoints.down(350)]: {
        transform: 'scale(0.8)'
      }
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

  const JoinTitleInArray = (stringArr, start, end) => {
    return stringArr.slice(start, end).join(' ')
  }

  useEffect(() => {
    let canvasTxt = canvasRef.current.getContext('2d')
    // canvasTxt.canvas.width = 150;
		canvasTxt.canvas.height = 60;
		canvasTxt.font = '22px sans-serif'
    canvasTxt.textAlign = 'center'
    canvasTxt.textBaseline = 'middle'

    // если слишком длинное название, делим на 2 строчки
    if(title.length >= 25) {
      const dividedTitle = title.split(' ')
      const indexDividedTitle = Math.ceil(dividedTitle.length / 2)

      canvasTxt.fillText(JoinTitleInArray(dividedTitle, 0, indexDividedTitle), 150, 25);
      canvasTxt.fillText(JoinTitleInArray(dividedTitle, indexDividedTitle, dividedTitle.length), 150, 45);
    }else {
      canvasTxt.fillText(title, 150, 25);
    }
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
