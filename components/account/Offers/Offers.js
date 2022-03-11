import React, { useState } from "react"

import Wait from "./tabs/Wait"
import Active from "./tabs/Active"
import Archive from "./tabs/Archive"
import safeAccountTab from "../../safeAccountTab"
import ScrollGetMore from "src/components/ScrollGetMore/ScrollGetMore"

import {useOffersLoading} from './useOffersLoading'

/**
 *
 * @param {*} param0
 * @returns
 */
const Offers = ({data, setData}) => {

	const [itemNav, setItemNav] = useState({ i: 1, ttl: "Активные" })

    const {dataOffers} = useOffersLoading(data, setData)

    console.log('dataOffers: ', dataOffers)

    const navItems = [
		{
			id: 1,
			title: "Активные",
			content: <Active key={1} offers={dataOffers?.active_posts?.data || []} />,
			count: dataOffers?.active_posts_count || 0,
			// count: offers?.active_posts?.length || 0,
		},
		{
			id: 2,
			title: "Ждут действия",
			content: <Wait key={2} offers={dataOffers?.wait_posts?.data || []} />,
			count: dataOffers?.wait_posts_count || 0,
			// count: offers?.wait_posts?.length || 0,
		},
		{
			id: 3,
			title: "Архив",
			content: <Archive key={3} offers={dataOffers?.archive_posts?.data || []} />,
			count: dataOffers?.archive_posts_count || 0,
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
