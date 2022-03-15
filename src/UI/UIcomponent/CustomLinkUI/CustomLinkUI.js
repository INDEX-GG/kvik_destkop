import React from 'react';
import Link from 'next/link'
import {Box} from "@mui/material";

const CustomLinkUI = ({children, href = '/', className, component}) => {
    return (
        <Link href={href}>
            <a>
                <Box component={component} className={className}>
                    {children}
                </Box>
            </a>
        </Link>
    );
};

export default CustomLinkUI;
