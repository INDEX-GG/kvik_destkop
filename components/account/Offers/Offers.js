import React, { useState, useEffect } from "react"

import Wait from "./tabs/Wait"
import Active from "./tabs/Active"
import Archive from "./tabs/Archive"
import safeAccountTab from "../../safeAccountTab"
import ScrollGetMore from "src/components/ScrollGetMore/ScrollGetMore"

import { STATIC_URL } from '#lib/constants'
import { photos2arr } from '#lib/services'

/**
 *
 * @param {*} param0
 * @returns
 */
const Offers = ({data}) => {

	const [itemNav, setItemNav] = useState({ i: 1, ttl: "Активные" })
	const [posts, setPosts] = useState()

	useEffect(() => {
		const posts = [data?.active_posts?.data || [], data?.wait_posts?.data || [], data?.archive_posts?.data || []];
		posts?.map(item => {
			if(item?.length && typeof item !== 'undefined') {
				item.map(obj => {
					const isObject = typeof obj?.photo !== 'object';
					const photos =isObject && photos2arr(obj?.photo)?.map(img => `${STATIC_URL}/${img}`)
					return obj.photo = isObject ? photos : obj.photo
				})
			}
		})
		setPosts(posts)

	}, [data])

    const navItems = [
		{
			id: 1,
			title: "Активные",
			content: <Active key={1} offers={typeof posts !== 'undefined' ? posts[0] : []} />,
			count: data?.active_posts_count || 0,
		},
		{
			id: 2,
			title: "Ждут действия",
			content: <Wait key={2} offers={typeof posts !== 'undefined' ? posts[1] : []} />,
			count: data?.wait_posts_count || 0,
		},
		{
			id: 3,
			title: "Архив",
			content: <Archive key={3} offers={typeof posts !== 'undefined' ? posts[2] : []} />,
			count: data?.archive_posts_count || 0,
		},
	]
	console.log('posts: ', posts);

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

export default ScrollGetMore({
	url: "/api/PersonalAreaPosts",
    tabs: ['active_posts', 'wait_posts', 'archive_posts']
})(Offers)
