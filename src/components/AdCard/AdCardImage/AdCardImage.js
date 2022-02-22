import React from 'react'
import Link from "next/link";
import {Box} from "@material-ui/core";
import { useRouter } from 'next/router'

import AdCardImageSlider from '../AdCardImageSlider/AdCardImageSlider'
import {useAdCardImageStyles} from './style'

const AdCardImage = ({offer_id, offer_photo, screenIsMobile}) => {
  const classes = useAdCardImageStyles()

  // console.log('offer_photo: ', offer_photo)

  return (
    <Link href={`/product/${offer_id}`} prefetch={false}>
      {/* card__top_slider */}
      <Box className={classes.card__top_slider}>
        {offer_photo.length === 1 &&
          <>
            <Box
              style={{
                backgroundImage: `url(${offer_photo[0]})`,
                width: '100%',
                height: '100%',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              onError={e => e.target.src = `${BASE_URL}/icons/photocard_placeholder.svg`}
            ></Box>
            <Box
              style={{
                backgroundImage: `url(${offer_photo[0]})`,
                backgroundSize: 'cover',
                filter: 'blur(20px)'
              }}
              className="imageBlur"
            ></Box>
          </>
        }
        {offer_photo.length > 1 && <AdCardImageSlider screenIsMobile={screenIsMobile} offer_id={offer_id} offer_photo={offer_photo} />}
      </Box>
    </Link>
  )
}

export default React.memo(AdCardImage)
