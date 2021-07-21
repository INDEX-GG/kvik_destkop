import React, {useState, useEffect} from "react"
import { useAd } from "../../../../hooks/useAd"
import { useUser } from "../../../../hooks/useUser"
import {useSubList} from "../../../../hooks/useSubscriptions"
import { useOutherUser } from "../../../../hooks/useOutherUser"
import { useRouter } from 'next/router'


function SellerData() {

const router = useRouter()

    const id = router.query.id

    const {subList} = useSubList(id)
    const {userInfo} = useAd(50)
    console.log(subList)
    console.log(userInfo) 

    const obj = {sellers: []}

    if (subList != undefined) {
        for (let x = 0; x < subList.length; x++) {
            const id = subList[x].id,
                  sellerName = subList[x].name,
                  sellerPic = subList[x].userPhoto
            // const {userInfo} = useAd(id)
            // console.log(userInfo)
            obj.sellers.push(
              {
                id,
                sellerName,
                sellerPic,

              }
            )
        }
    }

    return obj
}

export default SellerData