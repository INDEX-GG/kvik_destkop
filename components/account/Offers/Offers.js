import React, { useState, useEffect } from "react"
import Active from "./tabs/Active"
import Wait from "./tabs/Wait"
import Archive from "./tabs/Archive"
import { useRouter } from "next/router"
// import { brooklyn } from "../../../lib/services";

import { useOfferAccount } from "../../../lib/Context/OfferAccountCTX"
import safeAccountTab from "../../safeAccountTab"
import ScrollGetMore from "src/components/ScrollGetMore/ScrollGetMore"

//const causes = "Неверная цена / Неверная категория / Невозможно дозвониться / Признаки дискриминации / Товар или услуга запрещенные у продаже в РФ / В одном объявлении несколько предложений товаров и услуг / Использование одинаковых изображений в разных объявлениях / Контактная информация в названии, тексте объявления или на фото / Нарушение других правил Квик";
const Offers = ({offers}) => {
	// const { userAccountProvider, totalPosts } = useOfferAccount()
	// const [activeOffersBox, setActiveOffersBox] = useState([])
	// const [waitOffersBox, setWaitOffersBox] = useState([])
	// const [archiveOffersBox, setArchiveOffersBox] = useState([])

    console.log('Offers-offers: ', offers)

	// const router = useRouter()
	const [itemNav, setItemNav] = useState({ i: 1, ttl: "Активные" })

	// useEffect(() => {
	// 	if (
	// 		[
	// 			...userAccountProvider?.active,
	// 			...userAccountProvider?.archive,
	// 			...userAccountProvider?.wait,
	// 		].length > 0
	// 	) {
	// 		// Активные объявления
	// 		//setActiveOffersBox(userAccountProvider?.filter((offer) => offer.verify_moderator.verify[0] === "1" && offer.active === 0));

	// 		// const verifyOffers = userAccountProvider?.filter((offer) => offer.verify === 0 && offer.active === 0)
	// 		// const sortedArray = [...verifyOffers].sort((prev, next) =>  {
	// 		//   const prevDate = Date.parse(prev.created_at)
	// 		//   const nextDate = Date.parse(next.created_at)
	// 		//   return nextDate - prevDate
	// 		// })

    //         // !
	// 		// setActiveOffersBox(userAccountProvider.active)
	// 		// setArchiveOffersBox(userAccountProvider.archive)
	// 		// setWaitOffersBox(userAccountProvider.wait)
    //         // !

	// 		// setActiveOffersBox(userAccountProvider?.filter((offer) => offer.verify === 0 && offer.active === 0));

	// 		// Ждут действия
	// 		//setWaitOffersBox(userAccountProvider?.filter((offer) => offer.verify === 2 || offer.verify === 3 || offer.verify === 4 || offer.verify === 5));
	// 		// setWaitOffersBox(userAccountProvider?.filter((offer) => offer.verify === 1 || offer.verify === 2));
	// 		// Архив
	// 		//setArchiveOffersBox(userAccountProvider?.filter((offer) => offer.verify_moderator.verify[0] === "1" && offer.active !== 0 && offer.active !== 4));
	// 		// setArchiveOffersBox(userAccountProvider?.filter((offer) => offer.verify === 0 && offer.active !== 0 && offer.active !== 4));
	// 	}
	// }, [userAccountProvider])

	// useEffect(()=>{  setActiveOffersBox(userAccountProvider.active)},[userAccountProvider.active])

	// useEffect(() => {
	// 	if (router) {
	// 		if (router.query.content !== undefined) {
	// 			setItemNav({
	// 				i: +router.query.content,
	// 				ttl: navItems[router.query.content - 1].title,
	// 			})
	// 		}
	// 	}
	// }, [router])

	// const dataWait = [
	//   { id: 1, img: "https://source.unsplash.com/random?interior", title: "2-комн. кваритра, 95 м", price: 3000000, date: "00.00.00 00.00", status: 1, cause: causes, verify: 4, delete: false },
	//   { id: 2, img: "https://source.unsplash.com/random?cars", title: "Mitsubishi Delica", price: 199999, date: "00.00.00 00.00", status: 0, verify: 5, verify_moderator: 5, delete: false },
	//   { id: 3, img: "https://source.unsplash.com/random?phone", title: "Samsung Galaxy S21 Ultra", price: 99999, date: "00.00.00 00.00", status: 2, verify: 2, delete: true },
	// ];

	// Пагинация
	const navItems = [
		{
			id: 1,
			title: "Активные",
			content: <Active key={1} offers={offers?.active_posts?.data || []} />,
			count: offers?.active_posts_count || 0,
			// count: offers?.active_posts?.length || 0,
		},
		{
			id: 2,
			title: "Ждут действия",
			content: <Wait key={2} offers={offers?.wait_posts?.data || []} />,
			count: offers?.wait_posts_count || 0,
			// count: offers?.wait_posts?.length || 0,
		},
		{
			id: 3,
			title: "Архив",
			content: <Archive key={3} offers={offers?.archive_posts?.data || []} />,
			count: offers?.archive_posts_count || 0,
			// count: offers?.archive_posts?.length || 0,
		},
	]

	return (
		<>
			<div className="clientPage__container_top">
				<div className="clientPage__container_nav__wrapper">
					<div className="clientPage__container_nav">
						{navItems.map((item) => {
							return (
								<a
									key={item.id}
									className={itemNav.i === item.id ? "navActive" : ""}
									onClick={() => {
										setItemNav({ i: item.id, ttl: item.title })
										safeAccountTab(item.id)
									}}
								>
									{/* {item.title} {brooklyn(item.count)}{" "} */}
									{/* {item.count} */}
									{`${item.title} ${item.count || ""}`}
								</a>
							)
						})}
					</div>
				</div>
			</div>
			{navItems.map((item) => itemNav.i === item.id && item.content)}
			{/* <button
        style={{width: '100px', height: '30px', backgroundColor: 'cyan', margin: '0 auto', display: 'block'}}
        onClick={()=> {
          setPage(page + 1)
        }}
        >
          test
          </button> */}
		</>
	)
}

export default React.memo(ScrollGetMore({
	url: "/api/PersonalAreaPosts",
    tabs: ['active_posts', 'wait_posts', 'archive_posts']
})(Offers))
