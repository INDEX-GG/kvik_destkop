import React, { useEffect, useCallback, useMemo } from "react"
import throttle from "lodash.throttle"

import { useMedia } from '#hooks/useMedia';
/**
 *
 * @param {onlyMobile} Boolean
 * @returns
 */
const ScrollEnd = ({onlyMobile}) => Component => {
  /**
   *
   * @param {props} Initial props component
   * @returns Component
   */
	const ScrollToEnd = (componentProps) => {

    const {limitShow, setLimitShow} = componentProps

    const {matchesMobile, matchesTablet} = useMedia()

    const isMobile = useMemo(
      () => (!!(matchesMobile || matchesTablet)),
      [matchesMobile, matchesTablet]
    )

    const isSkip = useMemo(
      () => !(onlyMobile && !isMobile),
      [onlyMobile, isMobile]
    )

    console.log(isSkip, onlyMobile, isMobile)

    // console.log('isSkip: ', onlyMobile, isMobile, onlyMobile && isMobile)

		const limitSeeCard = useMemo(
      () => (componentProps.renderCards.length || 24),
      [componentProps.renderCards.length]
    )

    // TODO: добавить проверку на число (должно быть двузначное)
		const currentLimitRate = useMemo(
      () => (limitSeeCard / 3),
      [limitSeeCard]
    )

		// const [limit, setLimit] = useState(isSkip ? componentProps.currentLimit : currentLimitRate)

		const throttleScrollHandler = useCallback(throttle(scrollHandler, 500), [])

		function scrollHandler(e) {
			const pixelsFromBottom =
				e.target.documentElement.scrollHeight -
				e.target.documentElement.scrollTop -
				window.innerHeight

			if (pixelsFromBottom < 200) {

				if (limitShow <= limitSeeCard) {
          // setLimit(limit + currentLimitRate)
          setLimitShow(limitShow + currentLimitRate)
				}
			}
		}

		useEffect(() => {
      console.log('useEffect-isSkip: ', isSkip)
      if(isSkip) return

      console.log('вешаем скролл')
			document.addEventListener("scroll", throttleScrollHandler)
			return () => {
				document.removeEventListener("scroll", throttleScrollHandler)
			}
		}, [limitShow])

		return <Component {...componentProps} currentLimit={limitShow} />
	}

	return ScrollToEnd
}

export default ScrollEnd
