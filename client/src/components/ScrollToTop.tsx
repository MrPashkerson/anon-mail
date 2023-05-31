import React, { useState, useEffect } from "react";
import { FaArrowCircleUp } from 'react-icons/fa';
import '../css/ScrollToTop.css';

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false)

    const checkVisibility = () => {
        if (window.pageYOffset > 300){
            setVisible(true)
        } else {
            setVisible(false)
        }
    }

    const scrollToTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    useEffect(() => {
        window.addEventListener('scroll', checkVisibility);
        return () => window.removeEventListener('scroll', checkVisibility);
    }, []);

    return (
        <div className="scroll-to-top">
            {visible && <div onClick={scrollToTop}><FaArrowCircleUp /></div>}
        </div>
    );
}

export default ScrollToTop;