import React, { useEffect, useState } from 'react'
import { Popper } from '@material-ui/core';

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
      }, 1000)
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
      <Popper className={styles.popper} disablePortal={true} open={isShowConfirm || false} placement="left-end" anchorEl={anchorRef.current}>
        <CookieConfirm handlerConfirm={handlerConfirm} />
      </Popper>
    </>
  )
}

export default React.memo(Cookie)
