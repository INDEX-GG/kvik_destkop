import React, {useState} from 'react'
import {Box} from "@material-ui/core";
import { useRouter } from 'next/router'
import clsx from 'clsx'

import { useMedia } from '#hooks/useMedia';
import {useAdCardClass} from './useAdCardClass'

import AdCardMenu from './AdCardMenu/AdCardMenu';
import AdCardTop from './AdCardTop/AdCardTop'
import AdCardBottom from './AdCardBottom/AdCardBottom'

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

  console.log(offer);
  console.log(offer.highlighting);
  console.log(offer?.selection_size);

  const {
    isHighlightCard,
    isSelectionSizeCard,
    isCardGridMobileWrapp,
  } = useAdCardClass({
    isGrid,
    screenIsMobile,
    selection_size: offer?.selection_size,
    highlighting: offer.highlighting,
  })

	const [openMenu, setOpenMenu] = useState(initialState);

  const handleCM = (e) => {
		e.preventDefault();
		setOpenMenu({
			mouseX: e.clientX - 2,
			mouseY: e.clientY - 4,
		});
	}

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
          {[classes.card__lg]: isSelectionSizeCard && isGrid}
        )
      }
    >
      <AdCardMenu
        offer_id={offer.id}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        initialState={initialState}
      />
      <Box
        className={
          clsx(
            classes.card__wrapper,
            {[classes.card__wrapperYellow]: isHighlightCard && !isSelectionSizeCard},
            {[classes.card__wrapper2Yellow]: isHighlightCard && isSelectionSizeCard},
            {[classes.card__wrapperV2]: isCardGridMobileWrapp},
        )}
      >
        <AdCardTop
          id={id}
          offer_id={offer.id}
          email={offer.email}
          user_id={offer.user_id}
          archived={offer.archived}
          offer_photo={offer.photo}
          screenIsMobile={screenIsMobile}
          viewing_bool={offer?.viewing_bool || false}
        />
        <AdCardBottom
          isGrid={isGrid}
          price={offer.price}
          title={offer.title}
          offer_id={offer.id}
          reviewed={offer.reviewed}
          delivery={offer.delivery}
          offer_address={offer.address}
          commercial={offer.commercial}
          screenIsMobile={screenIsMobile}
          highlighting={offer.highlighting}
          offer_created_at={offer.created_at}
          selection_size={offer.selection_size}
          secure_transaction={offer.secure_transaction}
        />
      </Box>
    </Box>
  )
})

export default React.memo(AdCard)
