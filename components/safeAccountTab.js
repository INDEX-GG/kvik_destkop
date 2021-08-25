import router from "next/router";

export default function safeAccountTab(contentId) {
	router.push(`/account/${router.query.id}?account=${router.query.account}&content=${contentId}`)
}