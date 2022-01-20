import React, {useState, useEffect} from 'react'
import { useMedia } from '../hooks/useMedia';

const scrollTop = () => {
    const [show, setShow] = useState(false);
    const { matchesMobile, matchesTablet, matchesCustom1024 } = useMedia();

    const toTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      };

    const listenScroll = () => {
        if (window.scrollY > 0) {
            setShow(true);
        } else {
            setShow(false);
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', listenScroll);
        return () => {
            document.removeEventListener('scroll', listenScroll);
        }
    })

    return (
        show && (
            matchesMobile || matchesTablet || matchesCustom1024
                ? <button className="scrollTopMobile" onClick={toTop}></button>
                : (
                    <div className="wrapperScrollTop">
                        <button className="scrollTop" onClick={toTop}></button>
                    </div>
                )

        )
    )
}

export default scrollTop;
