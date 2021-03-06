import React, {useEffect, useState} from 'react';
// import {useSubBool} from '../../../hooks/useSubscriptions';
// import {getTokenDataByPost} from "../../../lib/fetch";
// import {useAuth} from "../../../lib/Context/AuthCTX";
// import {Button, Dialog, DialogActions, DialogContent, DialogContentText} from "@material-ui/core";
// import {standartDate} from "../../../lib/services";
// import {useBlockedBool} from '../../../hooks/useBlocked';
import { useStatistics } from "#lib/Context/StatisticsCTX";
import { useStore } from '#lib/Context/Store';

const ProductUserBlockSubRep = ({id, sellerId, mobile}) => {
    const {userInfo} = useStore()

    // const {userSub} = useSubBool(id, sellerId)
    // const {token} = useAuth();
    const [userBool, setUserBool] = useState(false)
    // const [isSubscribed, setIsSubscribed] = useState(false)
    const [loading, /*setLoading*/] = useState(false)
    const {addSubscribers, addUnsubscribe} = useStatistics()
    // const {userBlocked} = useBlockedBool(id, sellerId)
    // const [blockLoading, setBlockLoading] = useState(false)
    // const [blockOpen, setBlockOpen] = useState(false)
    // const [userBlockBool, setUserBlockBool] = useState(false)

    useEffect(() => {
      if(!userInfo) return
  
      setUserBool(userInfo.subscriptions.includes(sellerId))
    }, [sellerId])

    // useEffect(() => {
    //     setUserBool(userSub)
    // }, [userSub])

    // useEffect(() => {
    //     setUserBlockBool(userBlocked)
    // }, [userBlocked])

    // async function subscribeUser() {
    //     if (id !== undefined && sellerId !== undefined) {
    //         setLoading(true)

    //         const subscribe = {
    //             user_id: id + "",
    //             seller_id: sellerId + ""
    //         }

    //         setUserBool(!userBool)

    //         await getTokenDataByPost("/api/subscriptions", subscribe, token)

    //         await getTokenDataByPost('/api/subscribers', {user_id: '' + sellerId, subscriber_id: '' + id}, token);


    //         setLoading(false)
    //     }


    // }

    const newSubHandler = () => {
        if(!userBool && id) {
          addSubscribers(sellerId)()
        //   setIsSubscribed(true)
          return
        }
    
        if(userBool && id) {
          addUnsubscribe(sellerId)()
        //   setIsSubscribed(false)
          return
        }
      }

    // const blockUser = async (option) => {
    //     if (option) {
    //         setBlockLoading(true)
    //         const userBlockInfo = {
    //             user_id: id,
    //             block_user_id: sellerId,
    //             time: standartDate(Date.now()),
    //             block: true,
    //         }
    //         if (id && sellerId) {
    //             setUserBlockBool(!userBlockBool)
    //             await axios.post('/api/blockUser', userBlockInfo)
    //         }
    //         setBlockLoading(false)
    //     }
    //     if (!option) {
    //         setBlockLoading(true)
    //         const userBlockInfo = {
    //             user_id: id,
    //             block_user_id: sellerId,
    //             block: false,
    //         }
    //         if (id && sellerId) {
    //             setUserBlockBool(!userBlockBool)
    //             await axios.post('/api/blockUser', userBlockInfo)
    //         }
    //         setBlockLoading(false)
    //     }
    //
    //
    // }

    return (
        id === sellerId ? null :
            <>
                {mobile&&<div className="ad__block_bottom__adaptive">
                    {mobile && (
                        <button
                            className={`ad__block_bottom__adaptive_left ${userBool ? 'ad__block_bottom__adaptive_left__active' : ''}`}
                            disabled={loading} 
                            onClick={() => {
                                // subscribeUser()
                                setUserBool(!userBool)
                                newSubHandler()
                            }}
                        >
                            {/* {userBool ? "????????????????????" : "??????????????????????"} */}
                            <span
                                className={`SellerInfoUserAdd ${userBool ? "SellerInfoUserAdd__active" : ''}`}/>
                        </button>
                    )}
                    {/* <div className="ad__block_bottom__adaptive_right"> */}
                        {/*<a className="SellerInfoShutUp small light underline" onClick={() => {*/}
                        {/*    if (!blockLoading) setBlockOpen(true)*/}
                        {/*}}>{userBlockBool ? '??????????????????????????' : '??????????????????????????'} ????????????????????????</a>*/}
                        {/* <a className="SellerInfoComplain small light underline">????????????????????????</a>  */}
                    {/* </div> */}
                </div>}
                {/*<Dialog open={blockOpen} onClose={() => setBlockOpen(false)}>*/}
                {/*    <DialogContent>*/}
                {/*        <DialogContentText>*/}
                {/*            ???? ??????????????, ?????? ???????????? {userBlockBool ? '??????????????????????????' : '??????????????????????????'} ?????????????????????????*/}
                {/*        </DialogContentText>*/}
                {/*    </DialogContent>*/}
                {/*    <DialogActions>*/}
                {/*        <Button onClick={() => {*/}
                {/*            blockUser(!userBlockBool);*/}
                {/*            setBlockOpen(false)*/}
                {/*        }}>{userBlockBool ? '??????????????????????????' : '??????????????????????????'}</Button>*/}
                {/*        <Button onClick={() => setBlockOpen(false)}>????????????</Button>*/}
                {/*    </DialogActions>*/}
                {/*</Dialog>*/}
            </>
    )
}

export default ProductUserBlockSubRep;
