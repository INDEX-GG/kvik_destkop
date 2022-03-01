import React, {useState} from 'react';
import {Box} from "@material-ui/core";
import clsx from 'clsx'

import CustomButtonUI from 'src/UI/UIcomponent/CustomButtonUI/CustomButtonUI'
import {useProductShowMoreWrapperStyles} from './style'

/**
 * TODO: переписать на collapse
 * @param {*} param0
 * @returns
 */
const ProductShowMoreWrapper = ({children}) => {

  const classes = useProductShowMoreWrapperStyles()

  const [openDesc, setOpenDesc] = useState(false)

  const handlerOpenDesc = () => {
    setOpenDesc(!openDesc)
  }

  console.log('openDesc: ', openDesc)

  return (
      <Box className={classes.root}>
          <Box
            className={clsx(
              classes.showSmall, {
                  [classes.showAll]: openDesc,
              }
            )}
          >
            {children}
          </Box>
          <CustomButtonUI
                onClick={handlerOpenDesc}
            >
                {!openDesc ? 'Показать больше' : 'Скрыть'}
          </CustomButtonUI>
      </Box>
  );
};

export default React.memo(ProductShowMoreWrapper);
