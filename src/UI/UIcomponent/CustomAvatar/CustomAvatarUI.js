import React from "react";
import {Avatar} from "@material-ui/core";
import {useCustomAvatarUIStyles} from './style';
import {initials, stringToColor} from "#lib/services";

const CustomAvatarUI = ({src, alt, userName, customStyle = {}}) => {

    const classes = useCustomAvatarUIStyles()

    return (
        <Avatar
            alt={alt}
            src={src}
            classes={{root: `${classes.avatar} ${customStyle}`}}
            style={{backgroundColor: stringToColor(userName)}
        }>
            {initials(userName)}
        </Avatar>
    )
}

export default React.memo(CustomAvatarUI);
