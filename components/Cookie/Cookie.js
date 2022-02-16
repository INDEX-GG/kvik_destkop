import React, { useEffect, useState } from 'react'
import { Box } from '@material-ui/core';

import CookieConfirm from './CookieConfirm/CookieConfirm'
import {CookieStyles} from './styles'

/**
 *
 * @param {anchorRef} ref (лежит в pages/index.js)
 * @returns
 */
const Cookie = ({anchorRef}) => {
  const [isShowConfirm, setIsShowConfirm] = useState(false)
  const styles = CookieStyles()

  const showCookieConfirm = () => {
    // cookieConfirm временно лежит в localStorage, пока не накрутится логика и не показывать часто модалку
    const cookieConfirm = JSON.parse(localStorage.getItem('cookieConfirm'))?.cookieConfirm || false

    // пустой cookieConfirm -> показываем модалку
    if(!cookieConfirm && typeof anchorRef.current !== 'undefined' && !isShowConfirm) {
      setTimeout(() => {
        setIsShowConfirm(prevState => !prevState)
      }, 1500)
    }
  }

  useEffect(() => {
    showCookieConfirm()
  }, [])

  // eslint-disable-next-line no-unused-vars
  const handlerConfirm = (e) => {
    setIsShowConfirm(prevState => !prevState)
    // TODO: дальнейшая логика про куки
    // !NOTICE: временно, добавляем в localStorage
    localStorage.setItem('cookieConfirm', JSON.stringify({cookieConfirm: true}))
  }

  return (
    <>
      {!isShowConfirm &&
        <Box
          className={styles.popper}
        >
          <CookieConfirm handlerConfirm={handlerConfirm} />
        </Box>
      }
    </>
  )
}

export default React.memo(Cookie)
