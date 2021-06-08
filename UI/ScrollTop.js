import React, {useState, useEffect} from 'react'

const scrollTop = () => {
const [show, setShow] = useState(false);
    const toTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
    
    const listenScroll = (e) => {
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
        show && <button className="scrollTop" onClick={toTop}></button>
    )
}

export default scrollTop;