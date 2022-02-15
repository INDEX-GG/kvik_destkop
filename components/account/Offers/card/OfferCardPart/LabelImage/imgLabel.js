import React from 'react'

import {LabelImageOfferStyles} from './style'

const ImageLabel = ({status}) => {
  const styles = LabelImageOfferStyles()

  const offerByType = {
    banned: 'Отклонено',
    time_limit: 'Истек срок размещения',
  }

  return (
    <p className={styles.pos_abs}>{offerByType[status]}</p>
  )
}

export default React.memo(ImageLabel)
