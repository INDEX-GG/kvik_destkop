import React, {useState, useEffect} from 'react'
import {IconButton, Box} from "@material-ui/core";
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import clsx from 'clsx'

import { useStore } from "../../../../lib/Context/Store";
import { useStatistics } from '../../../../lib/Context/StatisticsCTX'

import {useAdCardTopStyles} from './style'
import AdCardImage from '../AdCardImage/AdCardImage'
import {useAdCardClass} from '../useAdCardClass'
// import PhoneModule from "#src/component/productV2/PhoneModule";

const AdCardTop = ({archived, offer_id, offer_photo, viewing_bool, email, user_id, id, category, screenIsMobile}) => {
  const classes = useAdCardTopStyles()
	const { userInfo } = useStore();
	const {addLike, addUnLike} = useStatistics()

  const {
    isArchivedCard,
  } = useAdCardClass({archived})

	const [isLiked, setIsLiked] = useState(false)
	// закоментил стейт, пока не разбереся с запросами.
	// const [, setPhoneModuleState] = useState(false);

	const call = true;

  useEffect(() => {
		if(!userInfo || userInfo?.favorites === null) return
		const isFavorite = userInfo?.favorites.includes(offer_id)
		setIsLiked(isFavorite)
	}, [offer_id, userInfo])

  const likeClickHandler = () => {
		if(userInfo && isLiked) {
			addUnLike(offer_id)()
			setIsLiked(false)
			return
		}
		if(userInfo && !isLiked) {
			addLike(offer_id)()
			setIsLiked(true)
			return
		}
	}

  return (
    <Box className={clsx(
      classes.card__top,
      {[classes.sold]: isArchivedCard}
    )}>
      {/* offer?.viewing_bool - Просмотрено */}
      {viewing_bool && <Box className={classes.card__top_seen}>Просмотрено</Box>}
      <AdCardImage
        offer_id={offer_id}
        offer_photo={offer_photo}
        category={category}
        screenIsMobile={screenIsMobile}
      />

      {/* card_top_info */}
      <Box className={classes.card__top_info}>
        {/* card__top_info_left */}
        {!screenIsMobile &&
          <Box className={clsx(classes.card__top_info_left, 'card__top_info_left_hover')}>
            {email && user_id !== id ? <Box component='span' className={classes.card_comment} /> : ''}
            {/* {call && user_id !== id ? <span  onClick={() => setPhoneModuleState(true)}   className='card_call'/> : ''} */}
            {call && user_id !== id ? <Box component='span' className={classes.card_call} /> : ''}
          </Box>
        }

        {/* card__top_info_right */}
        <Box
          component='div'
          className={clsx(classes.card__top_info_right, 'card__top_info_right_hover')}
        >
          {user_id !== id &&
            <IconButton
              onClick={likeClickHandler}
              color={isLiked ? 'primary' : 'secondary'}
              className={clsx(classes.card_like, 'card_like_hover')}
            >
              {isLiked &&  <FavoriteRoundedIcon />}
              {!isLiked && <FavoriteBorderRoundedIcon/>}
            </IconButton>
          }
        </Box>
      </Box>
      {/* <PhoneModule productInfo={offer} dialog={phoneModuleState} setDialog={setPhoneModuleState} /> */}
			{/* телефонный модуль делает очень много запросов. Отключен пока не пофиксится баг */}
			{/* <PhoneModule productV2={offer} dialog={phoneModuleState} setDialog={setPhoneModuleState} userName={offer.user_name} userPhotoInIndex={offer.user_photo} userPhone={offer.user_phone} userRating={offer.rating}/> */}
    </Box>
  )
}

export default React.memo(AdCardTop)
