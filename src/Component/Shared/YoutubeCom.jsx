import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import ReactPlayer from 'react-player';

const YoutubeCom = () => {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <div className="video-section">
            <h2 className="text-3xl font-bold text-center text-green-500 pt-10 pb-5 "data-aos="flip-right"
            data-aos-duration="3000"
            data-aos-delay="0">See Our Demo Video</h2>
            <div className="player-wrapper pb-5">
                <ReactPlayer 
                    className="react-player"
                    url='https://youtu.be/oXke6njj5Mw?si=bcxN_JNOeDoaIpYg' 
                    width="100%"
                    // height="100%"
                    controls={true}
                />
            </div>
        </div>
    );
};

export default YoutubeCom;
