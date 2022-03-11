import React from "react";
import {Box} from "@material-ui/core";
import {useAdMiniatureItemStyles} from './style';
import {parsePhoto, stringSlice} from '../../../services/services'
import Image from 'next/image';
import {STATIC_URL} from "#lib/constants";
import {useCustomRouter} from "../../../hook/globalHooks/useCustomRouter";
import {ToRubles} from "#lib/services";


const AdMiniatureItem = ({photo, id, price, title}) => {

    const classes = useAdMiniatureItemStyles()
    const {pushTo} = useCustomRouter();

    const photos = parsePhoto(photo, true);
    const photoSrc = `${STATIC_URL}/${photos}`


    const handlePushMiniature = () => {
        pushTo(`/product/${id}`)
    }


    return (
        <Box className={classes.miniatureContainer} onClick={handlePushMiniature}>
            <Box className={classes.miniatureImage}>
                <Image
                    objectFit='cover'
                    loader={() => photoSrc}
                    width={88}
                    height={88}
                    src={photoSrc}
                    alt='miniaturePhoto'
                />
            </Box>
            <Box className={classes.miniaturePrice}>
                {ToRubles(price)}
            </Box>
            <Box className={classes.miniatureTitle}>
                {stringSlice(title, 15)}
            </Box>
        </Box>
    )
}

export default React.memo(AdMiniatureItem);
