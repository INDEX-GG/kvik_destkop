import React from "react";
import {Avatar} from "@material-ui/core";
import {useCustomAvatarUIStyles} from './style';
import {initials, stringToColor} from "#lib/services";

const CustomAvatarUI = ({src, alt, userName}) => {

    const classes = useCustomAvatarUIStyles()
    console.log(src);

    return (
        <Avatar
            alt={alt}
            src={src}
            classes={{root: classes.avatar}}
            style={{backgroundColor: stringToColor(userName)}
        }>
            {initials(userName)}
        </Avatar>
    )
}

export default React.memo(CustomAvatarUI);
