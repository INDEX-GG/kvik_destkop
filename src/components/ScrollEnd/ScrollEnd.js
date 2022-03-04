import React, { useEffect } from "react"
import throttle from "lodash.throttle"

/**
 * * Вешаем скролл до середины страницы и увеличиваем показ объявлений (limitShow) на maxCountShow
 * ? Вызывается в src/components/NewCategoryScrollPostData/CategoryScrollPostData
 * @param {Component} React.Component
 * @returns ScrollToEnd
 */
const ScrollEnd = Component => {
  /**
   *
   * @param {componentProps} Initial props component
   * @returns Component
   */
	const ScrollToEnd = (componentProps) => {

    const {isMobile, limitShow, setLimitShow, maxCountShow} = componentProps
		const lengthCards = componentProps.renderCards.length

		const throttleScrollHandler = throttle(scrollHandler, 500)

		function scrollHandler(e) {
      const _scrollHeight = e.target.documentElement.scrollHeight;
      const _scrollTop = e.target.documentElement.scrollTop;
      // дошли до середины и есть что показывать
      const hasShowMore = (_scrollTop > _scrollHeight / 2) && (limitShow <= lengthCards)

      if(hasShowMore) setLimitShow(limitShow + maxCountShow)
		}

		useEffect(() => {
      if(isMobile) {
        document.addEventListener("scroll", throttleScrollHandler)
        return () => {
          document.removeEventListener("scroll", throttleScrollHandler)
        }
      }
		}, [limitShow])

		return <Component {...componentProps} />
	}

	return ScrollToEnd
}

export default ScrollEnd
