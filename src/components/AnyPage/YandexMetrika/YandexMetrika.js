import React, { useCallback, useEffect } from 'react'
import {Box} from '@material-ui/core'
import Router from 'next/router'
import ym, { YMInitializer } from 'react-yandex-metrika'
import {YANDEX_METRIK} from "#lib/constants";

// const enabled = process.env.NODE_ENV === 'production' && YANDEX_METRIK
const enabled = YANDEX_METRIK

const YandexMetrika = (props) => {
    const { children } = props

    const hit = useCallback((url) => {
        if (enabled) {
            ym('hit', url)
        }
    }, [])

    useEffect(() => {
        hit(window.location.pathname + window.location.search)
        Router.events.on('routeChangeComplete', (url) => hit(url))
    }, [])

    return (
        <>
            {enabled && (
                <Box style={{height: '0px', visibility: 'hidden'}}>
                    <YMInitializer
                        accounts={[Number(YANDEX_METRIK)]}
                        options={{ webvisor: true, defer: true }}
                        version="2"
                    />
                </Box>
            )}
            {children}
        </>
    )
}

export default YandexMetrika
