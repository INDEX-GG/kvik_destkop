import {makeStyles} from "@material-ui/core";


export const useProductSliderStyles = (isMobile) => {
    const useStyles = makeStyles((theme) => ({
        swiperContainer: {
            display: 'flex',
            flexDirection: isMobile ? 'column-reverse' : 'column',
        },
        swiperNormalSlide: {
            height: '400px',
            overflow: 'hidden',
            borderRadius: isMobile ? '8px 8px 0 0' : 'initial',
            backgroundColor: 'rgba(217, 217, 217, 0.75)',
            [theme.breakpoints.down(350)]: {
                height: '300px !important'
            }
        },
        swiperNormalSlideImg: {
            objectFit: 'contain',
            height: '400px',
            maxHeight: '400px',
            width:'100%',
            [theme.breakpoints.down(350)]: {
                height: '300px !important'
            }
        },
        swiperLittle: {
            height: '88px',
            display: !isMobile ? 'block' : 'none'
        },
        swiperLittleSlideImg: {
            height: '88px !important',
            objectFit: 'cover !important',
        },
        swiperNone: {
            display: 'none !important'
        },
        sliderModal: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.85)',
        },
        sliderModalPosition: {
            width: '100%',
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: '100',
        },
        modalSliderClose: {
            cursor: 'pointer',
            width: '100%',
            '&::after': {
                content: '""',
                position: 'absolute',
                right: '5%',
                top: '20px',
                transform: 'rotate(45deg)',
                backgroundColor: '#52b9c5',
                width: '5px',
                height: '20px',
                borderRadius: '10px',
                zIndex: 100,
            },
            '&::before': {
                content: '""',
                position: 'absolute',
                right: '5%',
                top: '20px',
                transform: 'rotate(-45deg)',
                backgroundColor: '#52b9c5',
                width: '5px',
                height: '20px',
                borderRadius: '10px',
                zIndex: 100,
            },
            [theme.breakpoints.down(1320)]: {
                '&::after': {
                    right: '15px',
                },
                '&::before': {
                    right: '15px',
                }
            }
        }
    }));

    return useStyles();
}
