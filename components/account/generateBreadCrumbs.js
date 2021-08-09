import router from "next/router"


export default function generateBreadCrumbs(subId) {
    router.push({
        pathname: `/account/58`,
        query: {
            account: router.query.account,
            content: subId
        }
    })
}