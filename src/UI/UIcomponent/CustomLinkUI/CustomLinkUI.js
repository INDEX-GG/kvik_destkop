import React from "react";
import Link from 'next/link'
import {useCustomLinkUIStyles} from './style';

const CustomLinkUI = (
    {
        href = '#',
        customRoot = null,
        children,
    }
) => {

    const classes = useCustomLinkUIStyles()
    const classesLink = customRoot ? `${customRoot} ${classes.link}` : classes.link

    return (
        <Link
            href={href}
        >
            <a className={classesLink}>
                {children}
            </a>
        </Link>
    )
}

export default React.memo(CustomLinkUI);
