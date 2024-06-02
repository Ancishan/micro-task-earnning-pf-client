import { useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import AOS from 'aos';
import 'aos/dist/aos.css';
import bgImage from '../assets/loginimg.png'; 
import { Link } from 'react-router-dom';

const HomeAnimation = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            data-aos="flip-left"
            data-aos-duration="3000"
            data-aos-delay="0"
        >
            <div
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div className="text-white text-center font-bold text-3xl p-4 rounded">
                    <TypeAnimation
                        sequence={[
                            'Welcome To Our Micro Task Earning Platform',
                            1000,
                            'Getting Task Worker',
                            1000,
                            'Earn Money By doing Task',
                            1000,
                        ]}
                        wrapper="p"
                        speed={30}
                        style={{ display: 'inline-block' }}
                        repeat={Infinity}
                        className="text-light fs-3 fw-bold"
                        cursor={false}
                    />
                    <h2 className='pt-12 pb-8 text-green-400 text-4xl font-bold'>Join Us</h2>
                    <h2 className='text-green-400 text-4xl font-bold'>Create Your Profile <br /><Link to='/login' className='btn text-green-500 text-3xl mt-3'>Start</Link></h2>
                </div>
               
            </div>
                        
        </div>
    );
};

export default HomeAnimation;
