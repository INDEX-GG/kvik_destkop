import axios from "axios";
import {useEffect, useState} from "react";
import {getTokenDataByPost} from "../lib/fetch";


export function useBlockedBool(user_id, seller_id, token) {
    const user = {user_id: user_id},
    [userInfo, setUserInfo] = useState([]),
    [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (user.user_id != 'undefined' && token) {
      getTokenDataByPost("/api/getBlockUsers", user, token)
        .then((res) => {

          if (res?.meesage) {
            setUserInfo(res.meesage)
          } else {
            setUserInfo(res?.blocked_users)
          }
          // console.log(res.data);
          setLoading(false);
        })
    }
  }, [user_id])

  if (userInfo?.length > 0) {
    if (userInfo && userInfo?.filter(item => item.id == seller_id).length > 0) {
      return {
        userBlocked: true,
        blockLoading: isLoading
      }
    } else {
      return {
        userBlocked: false,
        blockLoading: isLoading
      }
    }
  } else {
    return {blockLoading: isLoading}
  }


  // if (userInfo.length > 0) {
  //     if (userInfo && userInfo?.filter(item => item.id == seller_id).length > 0) {
  //         return {
  //             userSub: true,
  //             userLoading: isLoading
  //         }
  //     } else {
  //         return {
  //             userSub: false,
  //             userLoading: isLoading
  //         }
  // }
  // } else {
  //     return {isLoading}
  // }
}
