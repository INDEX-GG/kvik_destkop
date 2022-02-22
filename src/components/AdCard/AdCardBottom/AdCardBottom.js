import React from 'react'
import {Box} from "@material-ui/core";
import Link from "next/link";
import clsx from 'clsx'

import { ellipsis, ToRusDate, ToRubles } from "#lib/services";
import {useAdCardBottomStyles} from './style'
import {useAdCardClass} from '../useAdCardClass'

const AdCardBottom = ({offer_id, offer_address, offer_created_at, reviewed, price, commercial, secure_transaction, title, delivery, screenIsMobile, highlighting, selection_size, isGrid}) => {
  const classes = useAdCardBottomStyles()
  const {
    isHighlightCard,
    isSelectionSizeCard,
    // isCommercialCard,
    isReviewedCard,
    // isCommercialCardWrapp,
    isCardGridMobileWrapp,
  } = useAdCardClass({highlighting, reviewed, selection_size, isGrid, screenIsMobile})

  return (
    <Link href={`/product/${offer_id}`} prefetch={false}>
      <Box className={
        clsx(
          classes.card__bottom,
          {[classes.card__bottomSeen]: isReviewedCard},
          // {[classes.card__noBorder]: !isCommercialCardWrapp && !isCommercialCard},
          {[classes.card__borderYellow]: isHighlightCard},
          {[classes.card__border2Yellow]: isHighlightCard && isSelectionSizeCard},
      )}>

        <Box className={classes.card__bottom_info}>

          {/* info_right */}
          <Box className={classes.card__bottom_info_right}>
            <Box>
              {!screenIsMobile && delivery ? <Box className={!commercial === 0 ? "card_delivery card_delivery-green" : "card_delivery"}/> : ''}
              {!screenIsMobile && secure_transaction ? <Box className={!commercial === 0 ? "card_secure card_secure-green" : "card_secure"}/> : ''}
            </Box>
          </Box>

          {/* info_left */}
          <Box className={classes.card__bottom_info_left}>
            <Box
              component="span"
              className={
                clsx(
                  {[classes.new__priceV2]: isCardGridMobileWrapp},
                  {[classes.new__price]: !isCardGridMobileWrapp},
              )}
            >
              {ellipsis(ToRubles(price), 15)}
            </Box>
          </Box>

        </Box>

        {/* info_middle */}
        <Box
          component="div"
          className={
            clsx(
              {[classes.info_middleV2]: isCardGridMobileWrapp},
              {[classes.info_middle]: !isCardGridMobileWrapp},
          )}
        >
          {commercial === 2 ? ellipsis(title, 40) : ellipsis(title, 54)}
        </Box>

        {/* info_footer */}
        <Box className={classes.card__bottom_info_footer}>
          <Box
            component="div"
            className={
              clsx(
                {[classes.card__bottom_info_footer_leftV2]: isCardGridMobileWrapp},
                {[classes.card__bottom_info_footer_left]: !isCardGridMobileWrapp},
            )}
          >
            {offer_address}
          </Box>
          <Box
            component="div"
            className={
              clsx(
                {[classes.card__bottom_info_footer_rightV2]: isCardGridMobileWrapp},
                {[classes.card__bottom_info_footer_right]: !isCardGridMobileWrapp},
            )}
          >
            {ToRusDate(offer_created_at)}
          </Box>
        </Box>
      </Box>
    </Link>
  )
}

export default React.memo(AdCardBottom)
