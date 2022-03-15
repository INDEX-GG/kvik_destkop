import React from 'react';
import {Avatar} from "@material-ui/core";
import {STATIC_URL} from "../../../../lib/constants";
import {initials, stringToColor} from "../../../../lib/services";

const ChatDefaultAvatar = ({name, clickAvatar}) => {

    return (
        name ?
        <div className='chatDefaultAvatar'>
            <Avatar
                onClick={clickAvatar && clickAvatar}
                src={`${STATIC_URL}/${name}`}
                style={{ backgroundColor: `${stringToColor(name)}`, cursor: 'pointer', pointerEvents: 'all' }}>
                {initials(name)}
            </Avatar>
        </div> : null
    );
};

export default ChatDefaultAvatar;
