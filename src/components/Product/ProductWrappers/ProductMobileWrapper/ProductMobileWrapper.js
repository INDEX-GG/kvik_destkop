import React from 'react'
import Router from "next/router";
import { Box } from '@material-ui/core';


import Footer from '#components/Footer'
import MobileModal from '#components/MobileModal'
import {useProductMobileWrapperStyles} from './style'

const ProductMobileWrapper = ({isMobile, children}) => {

  const classes = useProductMobileWrapperStyles()

  const handleCloseModal = () => {
    Router.push(`/`)
  }

  return (
    <>
      {isMobile ? (
        <Box className={classes.productPageModal}>
            <MobileModal
            title='На главную'
            dialog={true}
            close={handleCloseModal}
            customClassesContainer={classes.productPageModal}
            >
                    {children}
                <Footer />
            </MobileModal>
        </Box>

      ) : (
        <>{children}</>
      )}
    </>
  )
}

export default ProductMobileWrapper
