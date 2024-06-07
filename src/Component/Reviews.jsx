import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';

import { useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/reviews")
            .then((res) => res.json())
            .then((data) => setReviews(data));
    }, []);

    return (
        <section className="my-20">
            <Swiper navigation={true}  className="mySwiper">
                {reviews.map((review) => (
                    <SwiperSlide key={review._id}>
                        <div className="flex flex-col items-center mx-24 my-16">
                            <Rating style={{ maxWidth: 180 }} value={review.rating} readOnly />
                            <p className="py-8">{review.details}</p>
                            <h3 className="text-2xl text-orange-400">{review.name}</h3>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Reviews;
