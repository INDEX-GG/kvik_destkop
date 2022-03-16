import React from "react"

import {useMedia} from '#hooks/useMedia'
import Loader from "#UI/icons/Loader";

// import Messages from '#components/account/Notifications/tabs/Messages'
import Messages from './Messages/Messages'

import AccountBody from "../../AccountWrappers/AccountBody/AccountBody"
import AccountChatPlaceHolderMobile from './../../../../../components/placeHolders/AccountChatPlaceHolder/AccountChatPlaceHolderMobile';

const MessagesRooms = ({data}) => {
    const {matchesMobile} = useMedia()

	return (
        <AccountBody>
            {typeof data !== 'undefined'
                ? <Messages data={data} />
                : (
                    <>
                {matchesMobile
                    ? <AccountChatPlaceHolderMobile />
                    : <div className='offer__placeholder_loader messagePlaceholder'><Loader/></div>}
                    </>
            )}
        </AccountBody>
    )
}

export default React.memo(MessagesRooms)
