import React from 'react'
import Link from "next/link";
import {Box} from "@material-ui/core";

import AdCardImageSlider from '../AdCardImageSlider/AdCardImageSlider'
import {useAdCardImageStyles} from './style'
import { BASE_URL } from "../../../../lib/constants";
import {usePlugImages} from '#hooks/usePlugImages'
import AdCardPng from '#components/AdCardPng'

const AdCardImage = ({offer_id, offer_photo, category, screenIsMobile}) => {
  const classes = useAdCardImageStyles()
  const {arr} = usePlugImages(offer_photo, category)
  return (
    <Link href={`/product/${offer_id}`} prefetch={false}>
      {/* card__top_slider */}
      <Box className={classes.card__top_slider}>
        {offer_photo === null && !offer_photo?.length
          ? <AdCardPng title={arr[0].title} />
          : (
            <>
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
            </>
          )
        }
      </Box>
    </Link>
  )
}

export default React.memo(AdCardImage)
