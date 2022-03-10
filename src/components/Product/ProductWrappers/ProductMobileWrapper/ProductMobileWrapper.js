import React from 'react'
import Router from "next/router";

import MobileModal from '#components/MobileModal'
// import {useProductMobileWrapperStyles} from './style'

const ProductMobileWrapper = ({isMobile, children}) => {

  // const classes = useProductMobileWrapperStyles()

  const handleCloseModal = () => {
    Router.push(`/`)
  }

  return (
    <>
      {isMobile ? (
        <MobileModal
          title='На главную'
          dialog={true}
          close={handleCloseModal}
          // customClassesContainer={classes.productPageModal}
        >
          {children}
        </MobileModal>
      ) : (
        <>{children}</>
      )}
    </>
  )
}

export default ProductMobileWrapper
