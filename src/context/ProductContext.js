import React, { useContext, useMemo, useState } from "react"
import { useProduct } from "#hooks/useProduct"
import { useMedia } from "#hooks/useMedia"
import { useRouter } from "next/router"
import { useAuth } from "#lib/Context/AuthCTX"

const ProductContext = React.createContext({})
export const useProductContext = () => useContext(ProductContext)

const ProductProvider = ({ children }) => {
	const { id, isAuth } = useAuth()
	const router = useRouter()
	const { matchesMobile, matchesTablet } = useMedia()

	const product = useProduct(router.query.id)

	const setProductInfo = useMemo(
		() => (product?.setProductInfo ? product?.setProductInfo : () => null),
		[product]
	)

	const isMyAd = useMemo(() => (id ? product?.user_id === id : false), [
		product?.user_id,
	])

	const isMobile = useMemo(() => !!(matchesMobile || matchesTablet), [
		matchesMobile,
		matchesTablet,
	])

    const isActive = useMemo(() => product?.status === "ok",
        [product?.status]
    )

	const isNoActive = useMemo(() => product?.status === "no_active",
		[product?.status]
	)

    const isBanned = useMemo(() =>  product?.status === "banned",
		[product?.status]
	)

	const isTimeLimit = useMemo(() =>  product?.status === "time_limit",
		[product?.status]
	)

    const isOpacity = useMemo(() => isNoActive || isTimeLimit || isBanned)

	return (
		<ProductContext.Provider
			value={{ productData: { ...product, isMyAd, isActive, isNoActive, isBanned, isTimeLimit, isOpacity }, isMobile, isAuth, setProductInfo }}
		>
			{children}

		</ProductContext.Provider>
	)
}

export default React.memo(ProductProvider)
