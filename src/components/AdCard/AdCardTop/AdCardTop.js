import React, {useState} from 'react'
import {IconButton, Box} from "@material-ui/core";
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';

import { useStore } from "../../../../lib/Context/Store";
import { useStatistics } from '../../../../lib/Context/StatisticsCTX'

import AdCardImage from '../AdCardImage/AdCardImage'

const AdCardTop = ({offer_id, offer_photo, viewing_bool, email, user_id, id, screenIsMobile}) => {
	const { userInfo } = useStore();
	const {addLike, addUnLike} = useStatistics()

	const [isLiked, setIsLiked] = useState(false)

	const call = true;

  console.log('offer_photo: ', offer_photo)

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
    <Box className='card__top'>
      {/* offer?.viewing_bool - Просмотрено */}
      {viewing_bool && <Box>Просмотрено</Box>}
      <AdCardImage
        offer_id={offer_id}
        offer_photo={offer_photo}
        screenIsMobile={screenIsMobile}
      />

      {/* card_top_info */}
      <Box>
        {/* card__top_info_left */}
        {!screenIsMobile &&
          <Box>
            {email && user_id !== id ? <span className="card_comment"/> : ''}
            {/* {call && user_id !== id ? <span  onClick={() => setPhoneModuleState(true)}   className='card_call'/> : ''} */}
            {call && user_id !== id ? <span className='card_call'/> : ''}
          </Box>
        }

        {/* card__top_info_right */}
        <Box>
          {user_id !== id &&
            <IconButton
              onClick={likeClickHandler}
              color={isLiked ? 'primary' : 'secondary'}
              className='card_like'
            >
              {isLiked &&  <FavoriteRoundedIcon />}
              {!isLiked && <FavoriteBorderRoundedIcon/>}
            </IconButton>
          }
        </Box>
      </Box>
    </Box>
  )
}

export default React.memo(AdCardTop)
