import React, {useState} from 'react'
import {Box} from "@material-ui/core";
import { useRouter } from 'next/router'
import clsx from 'clsx'

import { useMedia } from '#hooks/useMedia';
import {useAdCardClass} from '../useAdCardClass'

import AdCardMenu from '../AdCardMenu/AdCardMenu';
import AdCardTop from '../AdCardTop/AdCardTop'
import AdCardBottom from '../AdCardBottom/AdCardBottom'

import {useAdCardStyles} from './style'

const initialState = {
	mouseX: null,
	mouseY: null,
};

const AdCard = React.forwardRef(({ id, offer, isGrid}, ref) => {
  const classes = useAdCardStyles()
  const router = useRouter()
	const { matchesMobile, matchesTablet } = useMedia();
	const screenIsMobile = matchesMobile || matchesTablet;

  const {
    isCommercialCard,
    isCommercialCardWrapp,
    isCardGridMobileWrapp,
    isCommercialGridCardWrapp
  } = useAdCardClass(offer.highlighning, isGrid, screenIsMobile)

	const [openMenu, setOpenMenu] = useState(initialState);

  const handleWheelClick = (id) => (e) => {
    if(e.button === 1) {
			router.push(`/product/${id}`);
    }
  }

  return (
    <Box
      ref={ref}
      onMouseDown={handleWheelClick(offer.id)}
			onContextMenu={(e) => handleCM(e)}
      className={
        clsx(
          classes.card,
          {[classes.card__lg]: isCommercialCard}
        )
      }
    >
      <AdCardMenu
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        initialState={initialState}
        offer_id={offer.id}
      />
      <Box className={
        clsx(
          classes.card__wrapper,
          {[classes.card__wrapperYellow]: isCommercialCardWrapp},
          {[classes.card__wrapperV2]: isCardGridMobileWrapp},
          {[classes.card__wrapperYellow]: isCommercialGridCardWrapp, [classes.card__wrapperV2]: isCommercialGridCardWrapp}
        )
      }>
        <AdCardTop
          id={id}
          email={offer.email}
          user_id={offer.user_id}
          offer_id={offer.id}
          offer_photo={offer.photo}
          screenIsMobile={screenIsMobile}
          viewing_bool={offer?.viewing_bool || false}
        />
        <AdCardBottom
          price={offer.price}
          title={offer.title}
          offer_id={offer.id}
          delivery={offer.delivery}
          offer_address={offer.address}
          commercial={offer.commercial}
          screenIsMobile={screenIsMobile}
          offer_created_at={offer.created_at}
          secure_transaction={offer.secure_transaction}
        />
      </Box>
    </Box>
  )
})

export default React.memo(AdCard)
