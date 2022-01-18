import React, {useState, useEffect} from 'react'

const scrollTop = () => {
const [show, setShow] = useState(false);
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
            <div style={{
                background: 'rgba(208, 237, 239, 0.25)',
                width: '45px',
                position: 'fixed',
                top: '0',
                left: '0',
                height: '100vh',
            }}>
                <button onClick={toTop}><span className="scrollTop"></span></button>
            </div>
        )
    )
}

export default scrollTop;
