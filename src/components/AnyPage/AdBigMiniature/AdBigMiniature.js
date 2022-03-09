import React, {useMemo} from "react";
import {Box} from "@material-ui/core";
import {useAdBigMiniatureStyles} from './style';
import Image from 'next/image'
import {ToRubles} from "#lib/services";
import {stringSlice} from "../../../services/services";

import AdCardPng from '#components/AdCardPng'

const AdBigMiniature = ({adPhoto, adPrice, adAddress, adTitle}) => {

    const classes = useAdBigMiniatureStyles()
    const hasPhoto = useMemo(
        () => Object.hasOwnProperty.call(adPhoto, 'title'),
        [adPhoto]
    )

    return (
        <Box className={classes.container}>
            <Box className={classes.image}>
                {hasPhoto ? (
                    <AdCardPng title={adPhoto.title} />
                ): (
                    <Image
                    objectFit='cover'
                    width={125}
                    height={136}
                    loader={() => adPhoto}
                    src={adPhoto}
                    />
                )}

            </Box>
            <Box className={classes.text}>
                <Box className={classes.price}>
                    {ToRubles(adPrice)}
                </Box>
                <Box className={classes.title}>
                    {stringSlice(adTitle, 16)}
                </Box>
                <Box className={classes.address}>
                    {stringSlice(adAddress, 60)}
                </Box>
            </Box>
        </Box>
    )
}

export default React.memo(AdBigMiniature);
