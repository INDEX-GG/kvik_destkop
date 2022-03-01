import React, {useEffect, useRef} from 'react'

import {LogoPlug} from '../UI/icons/Logo.js'
import { makeStyles } from "@material-ui/core";


const useClass = makeStyles((theme) => ({
  logo: props => ({
    width: '100%',
    height: props.height_logo || '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '& svg': {
      [theme.breakpoints.down(350)]: {
        transform: 'scale(0.8)'
      }
    },

    [theme.breakpoints.down(350)]: {
      height: props.bigImage && '300px',
    }
  }),
  canvas: props => ({
    width: props.bigImage ? '55%' : '100%',
    [theme.breakpoints.down(960)]: {
      width: props.bigImage ? '55%' : '200px',
    },
    [theme.breakpoints.down(350)]: {
      width: props.bigImage ? '300px' : '150px',
    }
  }),
  img: {
    width: '100%',
  }
}))

const AdCardPng = ({title = 'Товар Kvik', height = '100%', bigImage = false}) => {
	const classes = useClass({height_logo: height, bigImage: bigImage})

  // const [img, setImg] = useState('')
	const canvasRef = useRef()

  const JoinTitleInArray = (stringArr, start, end) => {
    return stringArr.slice(start, end).join(' ')
  }

  useEffect(() => {
    let canvasTxt = canvasRef.current.getContext('2d')
    canvasTxt.canvas.width = bigImage ? 600 : 200;
		canvasTxt.canvas.height = 60;
		canvasTxt.font = bigImage ? '500 42px sans-serif' : '16px sans-serif'
    canvasTxt.textAlign = 'center'
    canvasTxt.textBaseline = 'middle'

    // если слишком длинное название, делим на 2 строчки
    if(title.length >= 25) {
      const dividedTitle = title.split(' ')
      const indexDividedTitle = Math.ceil(dividedTitle.length / 2)

      canvasTxt.fillText(JoinTitleInArray(dividedTitle, 0, indexDividedTitle), 150, 25);
      canvasTxt.fillText(JoinTitleInArray(dividedTitle, indexDividedTitle, dividedTitle.length), 150, 45);
    }else {
      canvasTxt.fillText(title, bigImage ? 300 : 100, 25);
    }
		// setImg(canvasTxt.canvas.toDataURL())
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
        {/* <img
          src={img}
          alt={title}
          className={classes.img}
        /> */}
      </canvas>
    </div>
  )
}

export default React.memo(AdCardPng)
