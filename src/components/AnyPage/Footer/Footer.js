import React from 'react';
import {Box} from "@material-ui/core";
import {useFooterStyles} from "./stlye";
import Link from 'next/link'
import KvikContainer from "../KvikContainer/KvikContainer";

const Footer = () => {

    const classes = useFooterStyles();

    return (
        <KvikContainer>
            <Box className={classes.container}>
                <Box className={classes.wrapper}>
                    <Box className={classes.footerInfo}>
                        <Box component='nav' className={classes.about}>
                            <Box component='ul' className={classes.aboutLinks}>
                                <Box component='li' className={classes.aboutLink}>
                                    <Link href='/about'>
                                        О компании
                                    </Link>
                                </Box>
                                <Box component='li' className={classes.aboutLink}>
                                    <Link href='/contacts'>
                                        Контакты
                                    </Link>
                                </Box>
                                <Box component='li' className={classes.aboutLink}>
                                    <Link href='/offer'>
                                        Оферта
                                    </Link>
                                </Box>
                            </Box>
                        </Box>
                        <Box component='ul' className={classes.social}>
                            <Box component='li' className={classes.socialItem}>
                                <Box
                                    component='a'
                                    target='_blank'
                                    rel="noreferrer"
                                    href='https://www.instagram.com/kvik_baraholka/'
                                >
                                    <Box className="instagramLinkIcon"/>
                                </Box>
                            </Box>
                            <Box component='li' className={classes.socialItem}>
                                <Box
                                    component='a'
                                    target='_blank'
                                    rel="noreferrer"
                                    href='https://vk.com/1kvik_ru'
                                >
                                    <Box className="vkLinkIcon"/>
                                </Box>
                            </Box>
                            <Box component='li' className={classes.socialItem}>
                                <Box
                                    component='a'
                                    target='_blank'
                                    rel="noreferrer"
                                    href='https://www.facebook.com/Kvik-Барахолкачелябинск-107509641798965'
                                >
                                    <Box className="fbLinkIcon"/>
                                </Box>
                            </Box>
                        </Box>
                        <Box className={classes.product} component='ul'>
                            <Box component='li' className={classes.website}>
                                <Box
                                    component='a'
                                    target='_blank'
                                    rel="noreferrer"
                                    href='https://lndex.ru/'
                                >
                                    Разработано студией INDEX
                                </Box>
                            </Box>
                            <Box className={classes.app} component='li'>
                                <Box
                                    component='a'
                                    target='_blank'
                                    rel="noreferrer"
                                    href='https://play.google.com/store'
                                >
                                    <Box className="androidDownloadLinkIconFooter"/>
                                </Box>
                            </Box>
                            <Box className={classes.app} component='li'>
                                <Box
                                    component='a'
                                    target='_blank'
                                    rel="noreferrer"
                                    href='https:/facebook.com'
                                >
                                    <Box className="iosDownloadLinkIconFooter"/>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className={classes.payment}>
                        <Box
                            component='img'
                            alt='pay-info'
                            src='/img/PaymentImg.png'
                        />
                    </Box>
                </Box>
            </Box>
        </KvikContainer>
    );
};

export default React.memo(Footer);
